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