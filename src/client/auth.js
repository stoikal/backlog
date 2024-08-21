import supabase from "./_supabase"

export const signInWithEmail = ({ email, password }) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = () => {
  return supabase.auth.signOut();
}

export const isLoggedIn = async () => {
  const { data: user, error } = await supabase.auth.getUser()

  if (error) return false

  return user !== null
}
