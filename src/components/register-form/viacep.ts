'use server'

export async function viaCepApi(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`,{
    method: "GET",
    mode: "cors"
  })
  const data = await response.json()

  return data

}