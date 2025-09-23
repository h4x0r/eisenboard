import { Star, Clock10, MessageCircle, Trash2 } from "lucide-react"

export const quadrantConfig = [
  {
    key: "urgent-important" as const,
    label: "Do First",
    icon: Star,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    key: "important-not-urgent" as const,
    label: "Schedule",
    icon: Clock10,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    key: "urgent-not-important" as const,
    label: "Delegate",
    icon: MessageCircle,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    key: "neither" as const,
    label: "Eliminate",
    icon: Trash2,
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-500/10",
  },
]

export const getQuadrantIcon = (quadrantId: string) => {
  const config = quadrantConfig.find((q) => q.key === quadrantId)
  return config ? config.icon : null
}
