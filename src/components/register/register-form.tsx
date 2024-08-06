"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { z } from "zod"
import { registerSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useTransition } from "react"


export default function RegisterForm(){
  const [isPending, setIsPending] = useTransition()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  function onSubmit(value: z.infer<typeof registerSchema>){
    console.log('onSubmit')
    console.log(value)
    
    form.reset()
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField 
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    disabled={isPending}
                    className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                     focus:outline-none"
                    placeholder="João Carlos"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    disabled={isPending}
                    className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                     focus:outline-none"
                    placeholder="example@gmail.com"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
           <FormField 
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    disabled={isPending}
                    className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                     focus:outline-none"
                    placeholder="****"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    disabled={isPending}
                    className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                     focus:outline-none"
                    placeholder="****"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full" variant="destructive">
          Criar conta
        </Button>
      </form>
    </Form>
  )
}