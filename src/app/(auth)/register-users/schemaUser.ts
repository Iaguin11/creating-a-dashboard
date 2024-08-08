import { z } from "zod";

export const registerSchema2 = z.object({
  fullName: z.string().min(1, { message: "Informe seu nome completo"}).regex(/^[A-Za-záàâãéèêẽíìîĩóòôõúùûũçñ ]+$/i, "Apenas letras 'A-Z' são permitidas"),
  socialName: z.string().optional(),
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
  gender: z.string().refine((value) => {
    if (value !== "") return true
  }, {message: "Escolha uma opção"}),
  maritalStatus: z.string().refine((value) => {
    if (value !== "") return true
  }, {message: "Escolha uma opção"}),
  stateUf: z.string().min(1, {message: "Campo Obrigatório"}),
  naturalness: z.string().min(1, {message: "Campo Obrigatório"}),
  nationality: z.string().min(1, {message: "Campo Obrigatório"}),
  phone: z.string().regex(/^(\d{2})(\d{8,9})$/, {message: "digite um número válido"}),
  checkWhatsApp: z.boolean().optional(),
  email: z.string().email({ message: "email inválido" }),
  motherName: z.string().min(1, {message: "Campo Obrigatório"}),
  fatherName: z.string().min(1, {message: "Campo Obrigatório"}),
  cep: z.string().min(1, {message: "Campo Obrigatório"}),
  street: z.string().min(1, {message: "Campo Obrigatório"}),
  houseNumber: z.string().min(1, {message: "Campo Obrigatório"}),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, {message: "Campo Obrigatório"}),
  city: z.string().min(1, {message: "Campo Obrigatório"}),
  state: z.string().min(1, {message: "Campo Obrigatório"}),
  clientIncome: z.string().min(1, {message: "Campo Obrigatório"}),
  supplementIncome: z.string().min(1, {message: "Campo Obrigatório"}), 
})