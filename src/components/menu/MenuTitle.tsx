import { ReactNode } from "react"

interface MenuTitleProps{
  children: ReactNode
}

export function MenuTitle({children}:MenuTitleProps){
  return(
    <h1 className="font-semibold">
      {children}
    </h1>
  )
}