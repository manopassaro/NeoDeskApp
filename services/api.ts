import axios from "axios";

// - Emulador Android Studio → http://10.0.2.2:3000
// - Expo Go em celular físico → use o IP da sua máquina (ex: http://192.168.0.10:3000)
const API_URL = "http://10.0.2.2:3000";

export async function createUsuario(nome: string, email: string, senha: string) {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }

    return await response.text(); // ou .json() se sua API retornar JSON
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function loginUsuario(email: string, senha: string) {
    try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro no login");
    }

    const data = await response.json(); // aqui a API retorna { message, user }
    return data;
  } catch (err) {
    console.error("Erro ao logar:", err);
    throw err;
  }
}