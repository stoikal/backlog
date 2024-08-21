import supabase from "./_supabase"

const getLists = () => {
  return supabase
    .from('lists')
    .select('*')
    .order('title', { ascending: true })
}

export const createList = async ({ title }) => {
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


export const addItemToList = async (listId, { gameId, isFinished }) => {
  const session = await supabase.auth.getSession();
  const { user } = session.data.session

  await Promise.all([
    _createGameStatus({ userId: user.id, gameId, isFinished }),
    _createListItem({ listId, gameId })
  ])         
}