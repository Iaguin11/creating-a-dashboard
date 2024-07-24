import { ReactNode } from "react"

interface ContentProps {
  children?: ReactNode
}

export default function Content({children}: ContentProps) {
  return (
      <div className={`
          flex flex-col mt-7
          dark:text-gray-200
      `}>
          {children}
      </div>
  )
}