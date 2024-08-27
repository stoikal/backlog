import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const { q } = getQuery(event)
  const client = await serverSupabaseClient(event)

  let query = client
    .from('games')
    .select('*')

  if (q) query = query.ilike('name', `%${q}%`)

  query = query.range(0, 99)
  query = query.order('name', { ascending: true })

  const { data } = await query

  return { data }
})
