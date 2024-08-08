import { z } from "zod";

export const registerSchema = z.object({
  nacionalidade: z.string(),
  naturalidade: z.string(),
  realState: z.string(),
  position: z.string(),
  CRECICode: z.string().min(1, {message: "Informe seu CRECI"}).length(11, {message: "SP-123456-7"}),
  fullName: z.string().min(1, { message: "Informe seu nome completo"}).regex(/^[A-Za-záàâãéèêẽíìîĩóòôõúùûũçñ ]+$/i, "Apenas letras 'A-Z' são permitidas"),
  cpf: z.string()
    .refine((cpf: string) => {
      // verifica se é ums string
      if (typeof cpf !== "string") return false
      // remove caracteres que não são dígitos
      cpf = cpf.replace(/[^\d]+/g, "")
      // verifica se foi digitado menos que 11 caracteres e se eles se repetem
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
      // converte cadas dígito para número
      const cpfDigits = cpf.split("").map((el) => +el)
      // realiza um cálculo para determinar o dígito de verificação
      const rest = (count: number) => {
        return (((
          cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10)
      }
      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
    }, 'Digite um CPF válido'),
  birthDate: z.string().min(1, { message: "Selecione uma data"}),
  gender: z.string(),
  maritalStatus: z.string(),
  phone: z.string().regex(/^(\d{2})(\d{8,9})$/, {message: "digite um número válido"}),
  checkWhatsApp: z.boolean().default(false).optional(),
  email: z.string().email({ message: "email inválido" }),
  password: z.string()
    .min(1, {message: "Campo Obrigatório"})
    .refine(pwrd => pwrd.length >= 8, {message: 'Mínimo 8 caracteres'})
    .refine(pwrd => /[A-Z]/.test(pwrd), {message: 'Mínimo 1 letra maiúscula'})
    .refine(pwrd => /[a-z]/.test(pwrd), {message: 'Mínimo 1 letra minúscula'})
    .refine(pwrd => /[0-9]/.test(pwrd), {message: 'Mínimo 1 número'})
    .refine(pwrd => /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwrd), {
      message: 'Mínimo 1 caractere especial'
    }),
  confirmPassword: z.string().min(1, {message: "Campo Obrigatório"}),
  cep: z.string().min(1, {message: "Campo Obrigatório"}),
  street: z.string().min(1, {message: "Campo Obrigatório"}),
  houseNumber: z.string().min(1, {message: "Campo Obrigatório"}),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, {message: "Campo Obrigatório"}),
  city: z.string().min(1, {message: "Campo Obrigatório"}),
  state: z.string().min(1, {message: "Campo Obrigatório"})
})
  .refine(({ password, confirmPassword }) => password === confirmPassword,{
    message: "Senhas não conferem",
    path: ["confirmPassword"]
  })
