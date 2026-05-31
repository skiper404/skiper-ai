import type { NavigationMenuItem } from "@nuxt/ui"
import { ref } from "vue"

export const navItems = ref<NavigationMenuItem[]>([
  {
    label: "Conversation",
    icon: "i-lucide-messages-square",
    to: "/dashboard/conversation",
  },
  {
    label: "Code Generator",
    icon: "lucide:code-2",
    to: "/dashboard/code-generator",
  },
  {
    label: "AI Article Writer",
    icon: "lucide:file-pen-line",
    to: "/dashboard/article-writer",
  },
  {
    label: "Blog Title Generator",
    icon: "lucide:heading-1",
    to: "/dashboard/blog-title",
  },
  {
    label: "Background Removal",
    icon: "lucide:image-off",
    to: "/dashboard/bg-removal",
  },
  {
    label: "Object Removal",
    icon: "lucide:eraser",
    to: "/dashboard/object-removal",
  },
  {
    label: "Resume Reviewer",
    icon: "lucide:file-search",
    to: "/dashboard/resume-reviewer",
  },
])
