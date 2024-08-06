import { ReactNode } from "react";

interface ContentHeaderRootProps {
  children: ReactNode
}

export function ContentHeaderRoot({ children }: ContentHeaderRootProps) {
  return (
    <header className="w-full rounded-lg bg-primary text-white py-6 px-12 space-y-4">
      {children}
    </header>
  )
}