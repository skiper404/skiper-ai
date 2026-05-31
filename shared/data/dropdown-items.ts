import type { DropdownMenuItem } from "@nuxt/ui";
import { ref } from "vue";

export const dropdownItems = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "Log out",
    icon: "i-lucide-cog",
  },
]);
