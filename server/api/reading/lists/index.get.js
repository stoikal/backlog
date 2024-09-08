import { serverSupabaseClient } from '#supabase/server'

const getLists = async (client) => {
  const { data: rawData } = await client
    .schema('reading_backlog')
    .from('lists')
    .select(`
      id,
      title,
      created_at,
      list_items (
        work_key,
        ...ref_works (
          title
        )
      )
    `)

  const data = rawData?.map((list) => ({
    listId: list.id,
    title: list.title,
    createdAt: list.created_at,
    items: list.list_items?.map((item) => ({
      workKey: item.work_key,
      workTitle: item.title
    }))
  }))

  return { data }
}

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  
  const [
    resLists,
  ] = await Promise.all([
    getLists(client)
  ])

  const lists = resLists.data

  return {
    data: lists
  }
})
