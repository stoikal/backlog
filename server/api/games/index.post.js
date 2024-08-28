import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const game = await readBody(event)

  const resGame = await client
    .schema('games_backlog')
    .from('games')
    .upsert([{
      id: game.id,
      name: game.name,
      first_release_date: game.firstReleaseDate,
    }])
    .select()

  let resGameGenres, resGamePlatforms;

  if (game.genres?.length) {
    const genres = game.genres
      .map((genre) => ({
        game_id: game.id,
        genre_id: genre.id
      }))


    resGameGenres = await client
      .schema('games_backlog')
      .from('games_genres')
      .upsert(genres)
      .select()
  }

  if (game.platforms?.length) {
    const platforms = game.platforms
      .map((platform) => ({
        game_id: game.id,
        platform_id: platform.id
      }))


    resGamePlatforms = await client
      .schema('games_backlog')
      .from('games_platforms')
      .upsert(platforms)
      .select()
  } 

  return { data: null, game, resGame, resGameGenres, resGamePlatforms }
})
