import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";

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
      <Link href={`${url}`} className={`flex flex-col justify-center items-center  dark:text-gray-200 ${className}` }>
        {icon}
        <span className="text-xs font-light">
          {text}
        </span>
      </Link>
    )
  }
  return (
    <Button onClick={onClick} className={`hover:bg-gray-100 dark:hover:bg-gray-800
    cursor-pointer `}>
      {url ? (
        <Link href={url}>
          {renderLink()}
        </Link>
      ): (
        renderLink()
      )}
    </Button>
  )
}