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
          title,
          work_statuses (
            is_finished
          )
        )
      )
    `)

  const data = rawData?.map((list) => ({
    listId: list.id,
    title: list.title,
    createdAt: list.created_at,
    items: list.list_items?.map((item) => ({
      workKey: item.work_key,
      workTitle: item.title,
      isFinished: item.work_statuses?.[0]?.is_finished
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
