import { ContentHeader } from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import RegisterFormClient from "./registerFormUser";

export default function Notifications(){
  return(
    <div className="w-full h-auto p-2 rounded-lg space-y-6">
      <ContentHeader.Root>
      <ContentHeader.Title title="Cadastro de Cliente" />
        <Separator className="flex-shrink w-24" />
        <ContentHeader.Description 
          description={`
          Preencha os campos abaixo com precisão. Suas respostas são essenciais para que 
          nossos analistas de crédito avaliarem esta solicitação de crédito imobiliário com eficácia. 
          Todas as informações fornecidas são tratadas de forma confidencial, garantindo uma análise cuidadosa e personalizada.
          `}
        />
      </ContentHeader.Root>
      <div className="w-full h-auto p-2 rounded-lg space-y-6">
          <RegisterFormClient />
      </div>
    </div>
  )
}