import { navigateTo } from "#app"
import type { DropdownMenuItem } from "@nuxt/ui"

export const useDropdownItems = () => {
  const { clear } = useUserSession()
  const theme = useColorMode()

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark"
  }

  const dropdownItems = computed<DropdownMenuItem[]>(() => [
    {
      label: "Profile",
      icon: "i-lucide-user",
      onSelect: async () => {
        await navigateTo("/dashboard/profile")
      },
    },
    {
      label: theme.value === "dark" ? "Light" : "Dark",
      icon: theme.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
      onSelect: toggleTheme,
    },
    {
      label: "Log out",
      icon: "lucide:log-out",
      onSelect: async () => {
        await clear()
        await navigateTo("/")
      },
    },
  ])

  return { dropdownItems }
}
