import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      {
        const projectId = req.query.project_id as string
        if (!projectId) {
          return res.status(400).json({ error: 'project_id is required' })
        }
        const { data, error } = await supabase
          .from('project_nodes')
          .select('*')
          .eq('project_id', projectId)
          .order('sort_order', { ascending: true })
        if (error) return res.status(500).json({ error })
        return res.status(200).json(data)
      }
    case 'POST':
      {
        const { project_id, parent_id = null, title, type, content = null, sort_order = 0 } = req.body
        if (!project_id || !title || !type) {
          return res.status(400).json({ error: 'project_id, title and type are required' })
        }
        const { data, error } = await supabase
          .from('project_nodes')
          .insert([{ project_id, parent_id, title, type, content, sort_order }])
          .single()
        if (error) return res.status(500).json({ error })
        return res.status(201).json(data)
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
