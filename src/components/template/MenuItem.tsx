import Link from "next/link";
import { ReactNode } from "react";

interface MenuItemProps {
  text: string
  icon: ReactNode
  url?: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MenuItem({text,icon,url,className, onClick}:MenuItemProps){
  function renderLink(){
    return( 
      <Link href='/' className={`flex flex-col justify-center items-center h-20 w-20 dark:text-gray-200 ${className}` }>
        {icon}
        <span className="text-xs font-light">
          {text}
        </span>
      </Link>
    )
  }
  return (
    <li onClick={onClick} className={`hover:bg-gray-100 dark:hover:bg-gray-800
    cursor-pointer `}>
      {url ? (
        <Link href={url}>
          {renderLink()}
        </Link>
      ): (
        renderLink()
      )}
    </li>
  )
}