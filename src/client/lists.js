import supabase from "./_supabase"

export const getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
}

export const deleteListItems = (gameId, listIds) => {
  return supabase
    .from('list_items')
    .delete()
    .eq('game_id', gameId)
    .in('list_id', listIds)
}

export const createListItems = (listItems) => {
  const list_items = listItems
    .map((item) => ({
      game_id: item.gameId,
      list_id: item.listId,
    }))

  return supabase
    .from('list_items')
    .upsert(list_items)
    .select()
}

export const createList = async ({ title }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session

  return supabase
    .from('lists')
    .insert([
      { user_id: user.id, title },
    ])
    .select()            
}

const _createListItem = ({ listId, gameId }) => {
  return supabase
    .from('list_items')
    .insert([
      { list_id: listId, game_id: gameId },
    ])
    .select()      
}

const _upsertGameStatus = ({ userId, gameId, isFinished }) => {
  return supabase
    .from('game_statuses')
    .upsert([
      { user_id: userId, game_id: gameId, is_finished: isFinished },
    ])
    .select()      
}

const _getGameStatus = ({ userId, gameId }) => {
  return supabase
    .from('game_statuses')
      .select('*')
      .eq('user_id', userId)
      .eq('game_id', gameId) 
}

export const addItemToList = async (listId, { gameId, isFinished }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session

  await Promise.all([
    _upsertGameStatus({ userId: user.id, gameId, isFinished }),
    _createListItem({ listId, gameId }),
  ])         
}

export const updateGameStatus = async ({ gameId, isFinished }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session
  
  return _upsertGameStatus({ userId: user.id, gameId, isFinished })
}

export const deleteList = (listId) => {
  return supabase
    .from('lists')
    .delete()
    .eq('id', listId)
}

export const getListsContainingGame = (gameId) => {
  return supabase
    .from('list_items')
    .select(`
      ...lists (*)  
    `)
    .eq('game_id', gameId)
} 