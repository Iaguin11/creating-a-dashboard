"use client"
import { Menu } from "@/components/menu/indx";
import AvatarUser from "@/components/template/AvatarUser";
import Header from "@/components/template/Header";
import MenuItem from "@/components/template/MenuItem";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { BellRing, LogOut } from "lucide-react";



export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>){
  const { logout } = useAuth()
  return(
   <main className="flex flex-col">
      <aside className="flex justify-between h-screen">
        <div className="flex basis-80 pb-6 flex-col justify-between bg-stone-200/50">
          <Header title="Page" subtitle="adim"/>
          <Menu.Root>
              <AvatarUser />
              <Button className="flex items-center gap-2 w-full text-primary" variant="outline">
                <BellRing size={16} className="text-primary"/>
                <span>Tem novidade</span>
              </Button>

              <Menu.Navbar>
                <Menu.title>Usuários</Menu.title>
                <div className="flex flex-col items-start p-2 pb-16 space-y-2">
                  <Menu.ActiveLink href="/dashboard">Home</Menu.ActiveLink>
                  <Menu.ActiveLink href="/settings">Ver Colaboradores</Menu.ActiveLink>
                  <Menu.ActiveLink href="/notifications">Notificações</Menu.ActiveLink>
                </div>
              </Menu.Navbar>
              <div className="">
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
        <section className="basis-full bg-secondary/80 px-16 py-10">
          {children}
        </section>
      </aside>
   </main>
  )
}