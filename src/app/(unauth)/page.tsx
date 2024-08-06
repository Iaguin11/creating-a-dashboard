import { LoginForm } from "@/components/login-user/login-form";
import { Social } from "@/components/login-user/social";
import Link from "next/link";

export default function LoginUser(){
  return(
    <div className="relative h-screen flex-col items-center justify-center md:grid bg-gradient-to-b to-[#F1F2FB] from-black/10 ">
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tighter">Acesse sua conta</h2>
            <p className="text-sm text-muted-foreground">Insira seu e-mail e senha abaixo</p>
          </div>
          <LoginForm />
          <Social />
          <p className="text-sm text-center text-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-gray-500">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}