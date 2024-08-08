import { ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode,
  className?: string
}

export default function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={className ? className : "flex items-center justify-between text-primary pb-2"}>
      {children}
    </div>
  )
}