import { Moon, Sun } from "lucide-react"

interface ThemeButtonProps {
  theme: string
  switchTheme: () => void
}

export default function ThemeButton({ theme, switchTheme }: ThemeButtonProps) {
  return theme === 'dark' ? (
    <div
      onClick={switchTheme}
      className={`
        hidden sm:flex items-center cursor-pointer
        bg-gradient-to-r from-yellow-300 to-yellow-600
        w-14 lg:w-24 h-8 p-1 rounded-full
      `}
    >
      <div
        className={`
          flex items-center justify-center
          bg-white text-yellow-600
          w-6 h-6 rounded-full
        `}
      >
        <Sun />
      </div>
      <div
        className={`
          hidden lg:flex items-center ml-4
          text-white
        `}
      />
    </div>
  ) : (
    <div
      onClick={switchTheme}
      className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-gray-500 to-gray-900
        w-14 lg:w-24 h-8 p-1 rounded-full
      `}
    >
      <div
        className={`
          hidden lg:flex items-center mr-2
          text-gray-300
        `}
      />
      <div
        className={`
          flex items-center justify-center
          bg-black text-yellow-300
          w-6 h-6 rounded-full
        `}
      >
        <Moon />
      </div>
    </div>
  );
}