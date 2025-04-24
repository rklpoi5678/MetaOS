// pages/api/project_nodes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const { method } = req

    console.log(`[${method} /api/project_nodes] id =`, id)

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'id가 문자열이 아닙니다.' })
    }

    if (!id) {
      return res.status(400).json({ error: 'id가 필요합니다.' })
    }

    switch (method) {
      case 'GET':
        {
          const { data, error } = await supabase
            .from('project_nodes')
            .select('*')
            .eq('id', id)
            .order('sort_order', { ascending: true })
          if (error) {
            console.error('[GET project_nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 조회 중 오류가 발생했습니다.' })
          }
          return res.status(200).json(data) // 배열로 반환
        }
      case 'PATCH':
        {
          const updates = req.body
          const { data, error } = await supabase
            .from('project_nodes')
            .update(updates)
            .eq('id', id)
          if (error) {
            console.error('[PATCH project_nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 수정 중 오류가 발생했습니다.' })
          }
          return res.status(200).json(data) // 배열로 반환
        }
      case 'DELETE':
        {
          const { data, error } = await supabase
            .from('project_nodes')
            .delete()
            .eq('id', id)
          if (error) {
            console.error('[DELETE project_nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 삭제 중 오류가 발생했습니다.' })
          }
          return res.status(200).json({ deleted: true, nodes: data }) // 배열로 반환
        }
      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

  } catch (err: unknown) {
    console.error('[project_nodes][ERROR]', err)
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message || '서버 오류가 발생했습니다.' })
    }
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' })
  }
}
