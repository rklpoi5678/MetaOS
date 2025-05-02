// pages/api/nodes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const { method } = req

    console.log(`[${method} /api/nodes] id =`, id)

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
            .from('nodes')
            .select('*')
            .eq('id', id)
          if (error) {
            console.error('[GET nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 조회 중 오류가 발생했습니다.' })
          }
          return res.status(200).json(data) // 배열로 반환
        }
      case 'PATCH':
        {
          const updates = req.body
          const { data, error } = await supabase
            .from('nodes')
            .update(updates)
          if (error) {
            console.error('[PATCH nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 수정 중 오류가 발생했습니다.' })
          }
          return res.status(200).json(data) // 배열로 반환
        }
      case 'DELETE':
        {
          const { data, error } = await supabase
            .from('nodes')
            .delete()
          if (error) {
            console.error('[DELETE nodes][ERROR]', error)
            return res.status(500).json({ error: error.message || '노드 삭제 중 오류가 발생했습니다.' })
          }
          return res.status(200).json({ deleted: true, nodes: data }) // 배열로 반환
        }
      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }

  } catch (err: unknown) {
    console.error('[nodes][ERROR]', err)
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message || '서버 오류가 발생했습니다.' })
    }
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' })
  }
}