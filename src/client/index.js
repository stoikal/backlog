import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const getListItems = () => {
  return supabase
    .from('list_items')
    .select(`
      list_id,
      created_at,
      games (
        id,
        title,
        thumbnail,
        game_status (
          is_finished
        )
      )
    `)
    .order('games(title)', { ascending: true })
}

const getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
}

export const getBacklog = async () => {
  const [
    { data: rawLists },
    { data: rawListItems }
  ] = await Promise.all([
    getLists(),
    getListItems(),
  ])

  const backlog = rawLists
    .map((list) => ({
      id: list.id,
      title: list.title,
      items: rawListItems
        .filter((item) => item.list_id === list.id)
        .map((item) => ({
          gameId: item.games.id,
          gameTitle: item.games.title,
          gameThumbnail: item.games.thumbnail,
          isFinished: item.games.game_status?.is_finished ?? false
        }))
        .sort((a, b) => a.isFinished - b.isFinished)
    }))

  return backlog
}

export const isLoggedIn = async () => {
  const { data: user, error } = await supabase.auth.getUser()

  if (error) return false

  return user !== null
}

export const signInWithEmail = ({ email, password }) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = () => {
  return supabase.auth.signOut();
}