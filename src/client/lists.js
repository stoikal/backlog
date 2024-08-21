import supabase from "./_supabase"

const getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
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

const _createGameStatus = ({ userId, gameId, isFinished }) => {
  return supabase
    .from('game_statuses')
    .insert([
      { user_id: userId, game_id: gameId, is_finished: isFinished },
    ])
    .select()      
}

const _updateGameStatus = ({ userId, gameId, isFinished }) => {
  return supabase
    .from('game_statuses')
    .update({ user_id: userId, game_id: gameId, is_finished: isFinished })
    .eq('user_id', userId)
    .eq('game_id', gameId)
    .select()
}

const _getGameStatus = ({ userId, gameId }) => {
  return supabase
    .from('game_statuses')
      .select('*')
      .eq('user_id', userId)
      .eq('game_id', gameId) 
}

const _createOrUpdateGameStatus = async ({ userId, gameId, isFinished }) => {
  const { data, error } = await _getGameStatus({ userId, gameId })

  if (data.length) {
    return _updateGameStatus({ userId, gameId, isFinished })
  } else {
    return _createGameStatus({ userId, gameId, isFinished })
  }
}

export const addItemToList = async (listId, { gameId, isFinished }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session

  await Promise.all([
    _createOrUpdateGameStatus({ userId: user.id, gameId, isFinished }),
    _createListItem({ listId, gameId }),
  ])         
}

export const updateGameStatus = async ({ gameId, isFinished }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session
  
  return _createOrUpdateGameStatus({ userId: user.id, gameId, isFinished })
}

export const deleteList = (listId) => {
  return supabase
    .from('lists')
    .delete()
    .eq('id', listId)
}