import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

export const getListItems = () => {
  return supabase
    .from('list_items')
    .select(`
      list_id,
      created_at,
      games (
        name,
        thumbnail,
        game_status (
          is_done
        )
      )
    `)
    .order('games(name)', { ascending: true })
}

export const getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
}