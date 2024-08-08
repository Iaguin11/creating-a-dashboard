"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Check, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { genderOptions, maritalStatus, statesList, supplementaryIncome } from "./data";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";

import {registerSchema2} from './schemaUser'
import { Button } from "@/components/ui/button";
import { AddressType } from "@/components/register-form/register-form";

interface IBGECity {
  id: number;
  nome: string;
}
interface IBGECountry {
  id: string;
  nome: string
}
interface IBGEUf {
  id: number;
  sigla: string
  nome: string
}


export default function RegisterFormClient(){
  const [open, setOpen] = useState(false)
  const [naturalnessOpen, setNaturalnessOpen] = useState(false)
  const [ufs, setUfs] = useState<IBGEUf[]>([])
  const [cities, setCities ] = useState<IBGECity[]>([])
  const [countries, setCountries] = useState<IBGECountry[]>([])
  const [selectedUf, setSelectedUf] = useState("")
  const [selectedCity, setSelectedCity] = useState("")


  const form = useForm<z.infer<typeof registerSchema2>>({
    resolver: zodResolver(registerSchema2),
    defaultValues: {
      fullName: "",
      socialName: "",
      cpf: "",
      birthDate: "",
      gender: "",
      maritalStatus: "",
      stateUf: "AC",
      naturalness: "",
      nationality: "Brasil",
      phone: "",
      checkWhatsApp: false,
      email: "",
      motherName: "",
      fatherName: "",
      cep: "",
      street: "",
      houseNumber: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      clientIncome: "",
      supplementIncome: "",
    }
  })
  const errors = form.formState.errors

  useEffect(()=> {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/paises`)
    .then(response => response.json())
    .then((data: IBGECountry[]) => {
      setCountries(data);
    })
    .catch(error => console.error('Error fetching states', error))
  }, [])

  useEffect(()=> {
    const fetchDataUf = async () => {
      try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        if(!response.ok){
          throw new Error('Failed to fetch cities');
        }
        const data: IBGEUf[] = await response.json()
        setUfs(data)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }
    fetchDataUf()
  }, [])

  useEffect(() => {
    if (selectedUf === "0"){
      return
    }
    const fetchDataCity = async () => {
      try{ 
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
      }
      const data: IBGECity[] = await response.json();
      setCities(data)
      } catch (error) {
        console.error('Error fetching cities:', error);
      } 
    }
    fetchDataCity()
  }, [selectedUf]);
  
  function handleSelectUf(data: string){
   setSelectedUf(data)
   setSelectedCity("0")
  }

  function onSubmit(data: z.infer<typeof registerSchema2>){
    const formData = JSON.stringify(data)
    localStorage.setItem('formData', formData)
    form.reset()
  }

  async function handleCepSearch(e: any, field: any) {
    e.preventDefault()
    try {
      const cepCode = String(field.value)
      const validCepCode = cepCode.trim().replace(/\D/g, "")
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${validCepCode}`)

      if (!response.ok) return false

      const data: AddressType = await response.json()

      if (data) {
        form.setValue("street", data.street)
        form.setValue("neighborhood", data.neighborhood)
        form.setValue("city", data.city)
        form.setValue("state", data.state)

        form.clearErrors(["street", "neighborhood", "city", "state"])
      }
      return true
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="flex flex-row gap-4">
          <FormField 
            control={form.control}
            name="fullName"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <Label className="font-bold" htmlFor="fullName">Nome Completo</Label>
                <FormControl>
                  <Input 
                    type="text"
                    placeholder="Digite o nome" 
                    {...field} 
                    id="name"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="socialName"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <Label className="flex gap-2 font-bold" htmlFor="socialName">
                  Nome Social 
                  <span className="font-light">(opcional)</span>
                </Label>
                <FormControl>
                  <Input 
                    type="text"
                    placeholder="Digite o nome" 
                    {...field} 
                    id="socialName"
                  />
                </FormControl>
              </FormItem>
            )}
          /> 
        </div>
        <div className="flex flex-row gap-4">
          <FormField 
              control={form.control}
              name="cpf"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/3">
                  <Label htmlFor="cpf">
                    CPF
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="123.456.789-10" 
                      {...field} 
                      id="cpf"
                    />
                  </FormControl>
                  
                   
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/3">
                  <Label htmlFor="birthday">
                    Data de nascimento
                  </Label>
                  <FormControl>
                    <Input 
                      className="text-muted-foreground"
                      type="date"   
                      placeholder="dd/mm/aaaa" 
                      {...field} 
                      id="birthday"
                    />
                  </FormControl>
                  
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/3">
                  <Label htmlFor="gender">
                    Gênero
                  </Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl >
                      <SelectTrigger className="text-muted-foreground" id="gender">
                        <SelectValue placeholder="Escolha uma opção"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-row gap-4">
          <FormField 
              control={form.control}
              name="maritalStatus"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/2">
                  <Label htmlFor="maritalStatus">
                    Estado Civil
                  </Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground" id="maritalStatus">
                        <SelectValue placeholder="Escolha uma opção"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maritalStatus.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> 
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="stateUf"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/6">
                  <Label htmlFor="stateUf">UF</Label>
                  <Select
                    value={selectedUf}
                    onValueChange={(value: string) => {
                      handleSelectUf(value)
                      field.onChange(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground" id="stateUf">
                        <SelectValue placeholder="UF"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ufs.map((uf) => (
                        <SelectItem
                          key={uf.id}
                          value={uf.sigla}
                        >
                          {uf.sigla}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> 
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="naturalness"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/2">
                  <Label htmlFor="naturalness">Naturalidade</Label>
                  <Popover open={naturalnessOpen} onOpenChange={setNaturalnessOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="justify-between space-x-4 text-muted-foreground"
                          aria-expanded={naturalnessOpen}
                          id="naturalness"
                          value={selectedCity}
                        >
                          {field.value
                            ? cities.find(item => item.nome === field.value)?.nome
                            : "Escolha uma opção"}
                          <SearchIcon size={18} />
                        </Button>
                      </FormControl>
                    </PopoverTrigger> 

                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Escolha uma opção"/>
                        <CommandEmpty>Nenhuma resultado encontrado</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {cities.map((item, index) => (
                              <CommandItem 
                                key={index} 
                                value={item.nome} 
                                onSelect={()=> {
                                  form.setValue("naturalness", item.nome)
                                  setNaturalnessOpen(false)
                                }}
                              >
                                <Check 
                                  className={cn('mr-2 size-4',
                                  item.nome === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                                {item.nome}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({field}) => (
                <FormItem className="flex flex-col gap-2 w-1/2 relative">
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button 
                          variant="outline"
                          role="combobox"
                          className="justify-between space-x-4"
                          aria-expanded={open}
                          id="nationality"
                        >
                          {field.value 
                            ? countries.find(item => item.nome === field.value)?.nome
                            : "Escolha uma opção"}
                          <SearchIcon size={18} />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Escolha uma opção"/>
                        <CommandEmpty>Nenhuma resultado encontrado</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {countries.map((item, index)=> (
                              <CommandItem 
                                key={index}
                                value={item.id}
                                onSelect={()=> {
                                  form.setValue("nationality", item.nome)
                                  setOpen(false)
                                }}
                              >
                                <Check 
                                  className={cn('mr-2 size-4',
                                  item.nome === field.value ? 'opacity-100' : 'opacity-0')}
                                />
                                {item.nome}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-1/2">
                <Label htmlFor="phone">
                  Telefone
                </Label>
                <FormControl>
                  <Input 
                    type="tel"   
                    placeholder="(00) 91234-5678" 
                    {...field} 
                    id="phone"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkWhatsApp"
            render={({field}) => (
              <FormItem className="flex items-center mt-4 gap-2 w-1/2">
               <FormControl >
                 <Checkbox 
                  className="mt-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                 />
               </FormControl>
                  <FormLabel>
                    É WhatsApp
                  </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-1/2">
                <Label htmlFor="email">
                  Email
                </Label>
                <FormControl>
                  <Input 
                    type="email"   
                    placeholder="exemplo@email.com" 
                    {...field} 
                    id="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="motherName"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-1/2">
                <Label htmlFor="motherName" className="font-bold">
                  Nome da Mãe
                </Label>
                <FormControl>
                  <Input 
                    type="text"   
                    placeholder="Digite o nome" 
                    {...field} 
                    id="motherName"
                  />
                </FormControl>
              </FormItem>
            )}  
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({field}) => (
              <FormItem className="flex flex-col gap-1 w-1/2">
                <Label htmlFor="fatherName" className="font-bold">
                  Nome do Pai
                </Label>
                <FormControl>
                  <Input 
                    type="text"   
                    placeholder="Digite o nome" 
                    {...field} 
                    id="fatherName"
                  />
                </FormControl>
              </FormItem>
            )}  
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField 
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-2/3 relative">
                <Label htmlFor="cep">CEP</Label>
                <FormControl>
                  <div className="flex flex-row gap-2">
                    <Input 
                      placeholder="12345-678"
                      id="cep"
                      {...field}
                    />
                    <Button 
                      className="flex gap-1"
                      type="button"
                      onClick={async (e) => {
                        const responseApi = await handleCepSearch(e, field) 
                      }}
                    >
                      <SearchIcon size={13} />
                      Buscar
                    </Button>
                  </div>
                </FormControl>
        
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-2/3 relative">
                <Label htmlFor="street">Logradouro</Label>
                <FormControl>
                  <Input 
                    placeholder="Rua/Avenida/Alameda etc..."
                    id="street"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-1/1 relative">
                <Label htmlFor="houseNumber">Número</Label>
                <FormControl>
                  <Input
                    placeholder=""
                    id="houseNumber"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-2/3 relative">
                <Label htmlFor="complement">Complemento</Label>
                <FormControl>
                  <Input
                    placeholder="Opcional"
                    id="complement"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField 
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-3/6 relative">
                <Label htmlFor="neighborhood">Bairro</Label>
                <FormControl>
                  <Input 
                    placeholder="Bairro X"    
                    id="neighborhood"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-2/6 relative">
                <Label htmlFor="city">Cidade</Label>
                <FormControl>
                  <Input
                    placeholder="São Paulo"
                    id="city"
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-1/6 relative">
                <Label htmlFor="state">UF</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="SP" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statesList.map(option => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
              control={form.control}
              name="clientIncome"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/2">
                  <Label htmlFor="clientIncome">
                    Informe a renda do cliente
                  </Label>
                  <FormControl>
                    <Input 
                      type="text"   
                      placeholder="R$" 
                      {...field} 
                      id="clientIncome"
                    />
                  </FormControl>
                 
                </FormItem>
              )}  
            />
            <FormField
              control={form.control}
              name="supplementIncome"
              render={({field}) => (
                <FormItem className="flex flex-col gap-1 w-1/2">
                  <Label htmlFor="supplementIncome">
                    Cliente deseja complementar Renda ?
                  </Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Escolha uma opção"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {supplementaryIncome.map(option=> (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                
                </FormItem>
              )}  
            />
        </div>
       
        <div className="flex justify-center gap-3">
          <Button variant="outline" type="button" className="w-32">
            Cancelar
          </Button>
          <Button type="submit" className="w-32">
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
