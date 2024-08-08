'use client'
import useApp from "@/hook/useApp";
import Title from "./Title";
import { ModeToggle } from "../theme/theme-toggle";

interface HeaderProps {
  title: string
  subtitle: string
}

export default function Header({title, subtitle }: HeaderProps){
  const {theme, switchTheme} = useApp()
  const handleSwitchTheme = switchTheme ?? (()=> {})
  return (
    <div className="flex">
      <Title title={title} subtitle={subtitle}/>
      <div className={`flex flex-grow justify-end items-center`}>
        <ModeToggle />
      </div>
    </div>
  )
}