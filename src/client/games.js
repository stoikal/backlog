import supabase from "./_supabase"

export const getGames = async ({ name }) => {
  return supabase
    .from('games')
    .select('*')
    .ilike('name', `%${name}%`)
    .range(0, 19)
    .order('name', { ascending: true })
}