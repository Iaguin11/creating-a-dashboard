"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type MenuActiveLinkProps = LinkProps & {
  children: ReactNode
}

export function MenuActiveLink({ href, children, ...rest }: MenuActiveLinkProps) {
  const pathName = usePathname()
  const isActive = pathName === href.toString()

  return (
    <Link
      href={href}
      className={`${isActive ? ' bg-stone-50  w-[225px] px-2 rounded text-primary hover:text-foreground' : 'px-2 text-muted-foreground'}`}
      {...rest}
    >
      {children}
    </Link>
  )
}