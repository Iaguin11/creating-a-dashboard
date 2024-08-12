import { ContentHeader } from "@/components/content-header";

import RegisterFormClient from "../register-users/registerFormUser";
import { Separator } from "@/components/ui/separator";
import { PersonTable } from "./components/person-table";
import { columns, CreditApplication } from "./components/columns";
import { creditApplications } from "./components/credit-applications";

async function getData(): Promise<CreditApplication[]> {
  const data = creditApplications
  return data
}

export default async function Settings(){
  const data = await getData()
  return(
    <div className="w-full h-auto p-2 rounded-lg space-y-6">
    <ContentHeader.Root>
    <ContentHeader.Title title="Ver usuários cadastrados" />
      <Separator className="flex-shrink w-24" />
      <ContentHeader.Description 
        description={`
        Aqui você poderá ver todos usuários cadastrado na plataforma.
        `}
      />
    </ContentHeader.Root>
    <div className="w-full h-auto p-2 rounded-lg space-y-6">
      <PersonTable columns={columns} data={data}/>
    </div>
  </div>
  )
}