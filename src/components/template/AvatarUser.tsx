import { useAuth } from "@/hook/useAuth"
import Image from "next/image"
import Link from "next/link"

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser({className}: AvatarUserProps){
  const { user} = useAuth()
  return (
      <Link href="/perfil">
          <Image
              src={user?.imageUrl ?? '/images/avatar.svg'}
              alt="Avatar do Usuário"
              width={10}
              height={10}
              className={`
                  rounded-full cursor-pointer
                  ${className}
              `}
          />
      </Link>
  )
}