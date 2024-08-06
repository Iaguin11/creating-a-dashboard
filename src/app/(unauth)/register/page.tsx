import RegisterForm from "@/components/register/register-form";
import Link from "next/link";


export default function Register(){
  return(
    <div className="relative h-screen flex-col items-center justify-center md:grid bg-gradient-to-b to-[#F1F2FB] from-black/10">
    <div className="p-4 lg:p-8 h-full flex items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tighter">Acesse sua conta</h2>
          <p className="text-sm text-muted-foreground">Insira seu e-mail e senha abaixo</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link 
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}