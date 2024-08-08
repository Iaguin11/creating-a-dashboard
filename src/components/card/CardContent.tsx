import { ReactNode } from "react"

interface CardContentProps {
  content: string,
  children?: ReactNode
}

export default function CardContent({ content, children }: CardContentProps) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      {children}
      {content}
    </span>
  )
}