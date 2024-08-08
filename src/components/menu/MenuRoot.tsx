import { ReactNode } from "react";

interface MenuRootProps {
  children: ReactNode,
}

export function MenuRoot({ children }: MenuRootProps) {
  return (
    <div className="p-6 space-y-9 ">
      {children}
    </div>
  )
}