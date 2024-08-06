"use client"
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { LoginSchema } from "./schema";

export function LoginForm(){
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(value: z.infer<typeof LoginSchema>){
    console.log('onSubmit')
    console.log(value)
    
    form.reset()
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                      focus:outline-none"  
                      placeholder="example@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="px-4 py-3 rounded-lg mt-2 border
                     focus:border-blue-500 focus:bg-white 
                      focus:outline-none"  
                      placeholder="****"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/">Esqueceu sua senha?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>
        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400
          rounded-lg px-4 py-3 mt-6        
        ">
          Login
        </Button>
      </form>
    </Form>
  )
}