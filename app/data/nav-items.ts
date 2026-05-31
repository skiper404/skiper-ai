import type { NavigationMenuItem } from "@nuxt/ui"
import { ref } from "vue"

export const navItems = ref<NavigationMenuItem[]>([
  {
    label: "Conversation",
    icon: "i-lucide-messages-square",
    to: "/dashboard/conversation",
  },
  {
    label: "Profile",
    icon: "i-lucide-user",
    to: "/dashboard/profile",
  },
])
