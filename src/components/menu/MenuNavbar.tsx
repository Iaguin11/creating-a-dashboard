import { ReactNode } from "react"

interface MenuNavbarProps {
  children: ReactNode
}

export function MenuNavbar({ children }: MenuNavbarProps) {
  return (
    <nav className="2xl:h-[560px] xl:h-full pt-3 px-4 bg-stone-200 border-2 rounded-md">
      {children}
    </nav>
  )
}