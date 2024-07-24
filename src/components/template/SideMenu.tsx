'use client'
import { BellRing, Home, LogOut, Play, Settings, Slack } from "lucide-react";
import MenuItem from "./MenuItem";

export default function SideMenu(){
  return(
    <aside className={`flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900`}>
      <div className={`flex flex-col items-center justify-center bg-gradient-to-r
        from-indigo-500 to-purple-800 h-20 w-20
      `}>
          <Play />    
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Início" icon={<Home/>}/>
        <MenuItem url="/settings" text="Ajustes" icon={<Settings />}/>
        <MenuItem url="/notifications" text="Notificações" icon={<BellRing />}/>
      </ul>
      <ul>
        <MenuItem text="Sair" icon={<LogOut />}
          className={`text-red-600 dark:text-red-400 hover:bg-red-400
            hover:text-white dark:hover:text-white`}
        />
      </ul>
    </aside>
  )
}