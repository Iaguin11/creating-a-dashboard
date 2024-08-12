import { Card } from "@/components/card";
import { ContentHeader } from "@/components/content-header";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="w-full h-full p-2 rounded-lg bg-[#F3F2F2] shadow-sm drop-shadow-lg border space-y-6">
      <ContentHeader.Root>
        <ContentHeader.Title title="Olá Iago Novaes"/>
        <Separator className="flex-shrink w-24"/>
        <ContentHeader.Description description={`
          Neste espaço você tem uma visão abrangente e o controle dos clientes.
        `}/>
      </ContentHeader.Root>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full py-6">
        <Card.Root>
          <Card.Header>
            <Card.HeaderTitle title="Status de crédito" />
          </Card.Header>
          <Card.Text text="Em análise" />
          <Card.Content content="Sua solicitação está sendo analisada pelo nosso time de analistas." />
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.HeaderTitle title="Status de crédito" />
          </Card.Header>
          <Card.Text text="Em análise" />
          <Card.Content content="Sua solicitação está sendo analisada pelo nosso time de analistas." />
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.HeaderTitle title="Status de crédito" />
          </Card.Header>
          <Card.Text text="Em análise" />
          <Card.Content content="Sua solicitação está sendo analisada pelo nosso time de analistas." />
        </Card.Root>
      </div>
  
    </div>
  )
}