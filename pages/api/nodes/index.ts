import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      {
        const userId = req.query.user_id as string
        if (!userId) {
          return res.status(400).json({ error: 'user_id is required' })
        }
        const { data, error } = await supabase
          .from('nodes')
          .select('*')
          .eq('user_id', userId)
        if (error) return res.status(500).json({ error })
        return res.status(200).json(data)
      }
    case 'POST':
      {
        const { user_id, parent_id = null, title, type, content = null} = req.body
        if (!user_id || !title || !type) {
          return res.status(400).json({ error: 'user_id, title and type are required' })
        }
        const { data, error } = await supabase
          .from('nodes')
          .insert([{ user_id, parent_id, title, type, content }])
          .single()
        if (error) return res.status(500).json({ error })
        return res.status(201).json(data)
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}