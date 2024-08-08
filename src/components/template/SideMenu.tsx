'use client'

import { BellRing, LogOut } from "lucide-react"
import { Menu } from "../menu/indx"
import { Button } from "../ui/button"
import AvatarUser from "./AvatarUser"
import MenuItem from "./MenuItem"
import { useAuth } from "@/hook/useAuth"


export default function SideMenu(){
  const { logout } = useAuth()
  return(
    <aside className="flex justify-between h-screen">
      <div className="flex basis-80 pb-6 flex-col justify-between">
        <Menu.Root>
            <AvatarUser />
            <Button className="flex items-center gap-2 w-full text-primary" variant="outline">
              <BellRing size={16} className="text-primary"/>
              <span>Tem novidade</span>
            </Button>

            <Menu.Navbar>
              <Menu.title>Usuários</Menu.title>
              <div className="flex flex-col items-start p-2 pb-16 space-y-2">
                <Menu.ActiveLink href="/">Home</Menu.ActiveLink>
                <Menu.ActiveLink href="/settings">Ver Colaboradores</Menu.ActiveLink>
                <Menu.ActiveLink href="/notifications">Notificações</Menu.ActiveLink>
              </div>
            </Menu.Navbar>
            <div className="flex items-center justify-center">
            <MenuItem text="Sair" icon={<LogOut/>} onClick={logout}
             className={`
              text-red-600 dark:text-red-400
              hover:bg-red-400 hover:text-white
              dark:hover:text-white
              `}
            />
            </div>
        </Menu.Root>
      </div>
    </aside>
  )
}