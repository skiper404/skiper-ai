export const useCurrentUser = () => {
  const { data: currentUser, refresh: refreshUser } = useFetch("/api/user")

  return { currentUser, refreshUser }
}
