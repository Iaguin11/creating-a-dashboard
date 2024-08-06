import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message: "email inválido"}),
  password: z.string()
    .min(1, {message: "Campo Obrigatório"})
    .refine(pwrd => pwrd.length >= 8, {message: 'Mínimo 8 caracteres'})
    .refine(pwrd => /[A-Z]/.test(pwrd), {message: 'Mínimo 1 letra maiúscula'})
    .refine(pwrd => /[a-z]/.test(pwrd), {message: 'Mínimo 1 letra minúscula'})
    .refine(pwrd => /[0-9]/.test(pwrd), {message: 'Mínimo 1 número'})
    .refine(pwrd => /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwrd), {
      message: 'Mínimo 1 caractere especial'
    }),
})
