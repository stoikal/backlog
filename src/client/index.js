import supabase from "./_supabase"

const _getListItems = async() => {  


  
  return supabase
    .from('list_items')
    .select(`
      list_id,
      created_at,
      games (
        id,
        name,
        game_statuses (
          user_id,
          is_finished
        )
      ),
      lists (*)
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
      createdAt: list.created_at,
      items: rawListItems
        .filter((item) => item.list_id === list.id)
        .map((item) => ({
          gameId: item.games.id,
          gameTitle: item.games.name,
          isFinished: item.games.game_statuses[0]?.is_finished ?? false
        }))
        .sort((a, b) => a.isFinished - b.isFinished)
    }))

  return backlog
}

const _getGameStatuses = () => {
  return supabase
    .from('game_statuses')
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
      items,
      pseudo: true
    }))
    .sort((a, b) => a.title > b.title ? 1 : -1)

  return result
}
