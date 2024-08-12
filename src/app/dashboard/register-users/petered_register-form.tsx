"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils";
;
import { registerSchema } from "./schema";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { realStateList, positionsList, statesList } from "./data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger,  SelectValue } from "@/components/ui/select";

type registerType = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [open, setOpen] = useState(false)
  const [realStateValue, setRealStateValue] = useState("")
  const [positionValue, setPositionValue] = useState("")
  const [genderValue, setGenderValue] = useState("")
  const [stateValue, setStateValue] = useState("")
  
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } =
  useForm<registerType>({
    resolver: zodResolver(registerSchema)
  })

  return (
    <form className="space-y-7">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="realState">Imobiliária</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
                id="realState"
              >
                {realStateValue
                  ? realStateList.find((realState) => realState.value === realStateValue)?.label
                  : "Selecione uma Imobiliária"
                }
                <SearchIcon size={18}/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Selecione uma Imobiliária"/>
                <CommandEmpty>Nenhuma imobiliária encontrada</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {realStateList.map((realState) => (
                      <CommandItem
                        key={realState.value}
                        value={realState.value}
                        onSelect={(currentValue: string) => {
                          setRealStateValue(currentValue === realStateValue ? "" : currentValue)
                          setOpen(false)
                        }}
                                              >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            realStateValue === realState.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {realState.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-4">
            <div className="w-2/3">
              <Label htmlFor="position">Cargo</Label>
              <Select onValueChange={setPositionValue}>
                <SelectTrigger id="position">
                  <SelectValue placeholder="Selecione um cargo"/>
                </SelectTrigger>
                <SelectContent>
                  {positionsList.map(position => (
                    <SelectItem
                      key={position.value}
                      value={position.value}
                    >
                      {position.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
                       
            {positionValue === "realtor" && (
              <div className="w-1/3">
                <Label htmlFor="creci">CRECI</Label>
                <Input 
                  type="text" 
                  placeholder="SP-123456-7" 
                  id="creci"
                />
                {errors.CRECICode &&
                <span className="text-xs text-rose-700 font-medium">
                  {errors.CRECICode.message}
                </span>}
              </div>  
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input 
            type="text" 
            placeholder="Digite seu nome"
            id="fullName"
          / >
        </div>
      </div>

      <div className="flex fex-row gap-4">
        <div className="flex flex-col gap-2 w-1/3">
          <Label htmlFor="cpf">CPF</Label>
          <Input 
            type="text"
            placeholder="Digite apenas números"
                        id="cpf"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input 
            type="date"
            placeholder="dd/mm/aaaa"
            id="birthDate"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <Label htmlFor="gender">Gênero</Label>
          <Select onValueChange={setGenderValue}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Selecione seu gênero"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male" >Masculino</SelectItem>
              <SelectItem value="female" >Feminino</SelectItem>
              <SelectItem value="nonbinary" >Não binário</SelectItem>
              <SelectItem value="empty" >Prefiro não mencionar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex fex-row gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label htmlFor="phone">Telefone</Label>
          <Input type="text" placeholder="(11) 91234-5678" id="phone"/>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label htmlFor="email">E-mail</Label>
          <Input type="text" placeholder="seu@email.com" id="email"/>
        </div>
      </div>

      <div className="flex fex-row gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            type="text" 
            placeholder="Digite uma senha de no mínimo 8 dígitos" 
            id="password"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Label htmlFor="confirmPassword">Confirmação de senha</Label>
          <Input 
            type="text" 
            placeholder="Confirme sua senha" 
            id="confirmPassword" 
          />
        </div>
      </div>

      <div className="flex fex-row gap-4">
         <div className="flex flex-col gap-2 w-1/3">
          <Label htmlFor="cep">CEP</Label>
          <div className="flex flex-row gap-2">
            <Input type="text" placeholder="12.345-678" id="cep"/>
            <Button><SearchIcon size={14}/> Buscar</Button>
          </div>
        </div>
         <div className="flex flex-col gap-2 w-1/3">
          <Label htmlFor="address">Logradouro</Label>
          <Input type="text" placeholder="Rua/Av/etc" id="address"/>
        </div>
        
         <div className="flex flex-row gap-2 w-1/3">
          <div className="flex flex-col gap-2 w-1/3">
            <Label htmlFor="houseNumber">Número</Label>
            <Input type="text" placeholder="123" id="houseNumber"/>
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <Label htmlFor="complement">Complemento</Label>
            <Input type="text" placeholder="Opcional" id="complement"/>
          </div>
        </div>
      </div>

      <div className="flex fex-row gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input type="text" placeholder="Bairro" id="neighborhood"/>
        </div>
        <div className="flex flex-col gap-2 w-4/6">
          <Label htmlFor="city">Cidade</Label>
          <Input type="text" placeholder="Cidade" id="city"/>
        </div>
        <div className="flex flex-col gap-2 w-1/6">
          <Label htmlFor="uf">UF</Label>
          <Select onValueChange={setStateValue}>
            <SelectTrigger id="uf">
              <SelectValue placeholder="UF"/>
            </SelectTrigger>
            <SelectContent>
              {statesList.map(state => (
                <SelectItem
                  key={state.value}
                  value={state.value}
                >
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 w-full justify-center">
        <Button variant="secondary">
          Cancelar
        </Button>
        <Button type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};