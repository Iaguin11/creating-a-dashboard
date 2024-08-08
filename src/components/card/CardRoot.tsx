import { ReactNode } from "react"

interface CardRootProps {
  children: ReactNode,
  className?: string
}

export default function CardRoot({ children, className }: CardRootProps) {
  return (
    <div className={`border bg-white p-5 rounded-xl shadow w-80 ${className}`}>
      {children}
    </div>
  )
}