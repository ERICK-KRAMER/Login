const endpoit = "http://localhost:3000/";

type User = Data[]

interface Data {
  id: string
  email: string
  password: string
}

async function GetUser(): Promise<User>{
    try {
        const response = await fetch(`${endpoit}users`);
        const JsonData = await response.json();
        return JsonData;
    } catch (error) {
        throw new Error(`Não foi possivel entrar em contato com o servidor ${error}`)
    }
}

export { GetUser } ;