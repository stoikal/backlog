import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

const _getListItems = () => {
  return supabase
    .from('list_items')
    .select(`
      list_id,
      created_at,
      games (
        id,
        name,
        game_status (
          user_id,
          is_finished
        )
      )
    `)

    .order('games(name)', { ascending: true })
}

const _getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
}

export const getBacklog = async () => {
  const [
    { data: rawLists },
    { data: rawListItems },
  ] = await Promise.all([
    _getLists(),
    _getListItems(),
  ])
  

  const backlog = rawLists
    .map((list) => ({
      id: list.id,
      title: list.title,
      items: rawListItems
        .filter((item) => item.list_id === list.id)
        .map((item) => ({
          gameId: item.games.id,
          gameTitle: item.games.name,
          isFinished: item.games.game_status[0]?.is_finished ?? false
        }))
        .sort((a, b) => a.isFinished - b.isFinished)
    }))

  return backlog
}

const _getGameStatuses = () => {
  return supabase
    .from('game_status')
    .select(`
      is_finished,
      games (
        id,
        name,
        released
      )
    `)
}

export const getDecade = async () => {
  const { data: rawGameStatues } = await _getGameStatuses()

  const decadeMap = rawGameStatues.reduce((res, item) => {
    if (item.is_finished && item.games.released) {
      const year = new Date(item.games.released).getFullYear()
      const decade = `${Math.floor(year / 10) * 10}s`
      const decadeGames = res[decade] || []

      return {
        ...res,
        [decade]: [...decadeGames, {
          gameId: item.games.id,
          gameTitle: item.games.name,
          isFinished: item.is_finished,
        }]
      }
    }

    return res
  }, {})

  const result = Object.entries(decadeMap)
    .map(([decade, items]) => ({
      title: decade,
      id: decade,
      items
    }))
    .sort((a, b) => a.title > b.title ? 1 : -1)

  return result
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

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}