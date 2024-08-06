import { ContentHeader } from "@/components/content-header";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="w-full h-full p-2 rounded-lg bg-stone-200/700 space-y-6">
      <ContentHeader.Root>
        <ContentHeader.Title title="Dashboard"/>
        <Separator className="flex-shrink w-24"/>
        <ContentHeader.Description description={`
          Neste espaço você tem uma visão abrangente dos processos e pessoas envolvidas na liberação de crédito imobiliário, permitindo uma gestão eficiente de novos cadastros e solicitações de crédito.
        `}/>
      </ContentHeader.Root>
    </div>
  )
}