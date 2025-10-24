import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";


export type UserDatabase = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: number;
  is_active: number;
};

export function useUserDatabase() {
  const database = useSQLiteContext();
  const router = useRouter();

  // Criar usuário (para cadastro inicial)
  async function createUser(data: Omit<UserDatabase, "id" >) {
    const statement = await database.prepareAsync(
      `INSERT INTO usuarios (nome, email, senha, tipo_usuario, is_active)
       VALUES ($nome, $email, $senha, $tipo_usuario, $is_active)`
    );

    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
        $email: data.email,
        $senha: data.senha, // pode futuramente virar hash
        $tipo_usuario: data.tipo_usuario ?? 0,
        $is_active: data.is_active ?? 1,
      });

      return { insertedId: result.lastInsertRowId };
    } finally {
      await statement.finalizeAsync();
    }
  }

  // existe usuario no banco?
  async function getAllUsers() {
    try {
      const query = `SELECT * FROM usuarios;`;
      const statement = await database.prepareAsync(query);

      const result = await statement.executeAsync(); // sem parâmetros
      const users = await result.getAllAsync();

      await statement.finalizeAsync();
      return users; // retorna array de usuários
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }


  // Função de login
  async function login(data: Omit<UserDatabase, "id">) {
    try {
    // 🔍 Busca o usuário pelo email
    const query = `
      SELECT * FROM usuarios
      WHERE email = ?
      LIMIT 1;
    `;

    const user = await database.getFirstAsync<UserDatabase>(query, [data.email]);

    // usuário existe?
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // usuário tá ativo?
    if (user.is_active !== 1) {
      throw new Error("Usuário inativo");
    }

    // senha correta?
    if (user.senha !== data.senha) {
      throw new Error("Senha incorreta");
    }

    // ok...
    console.log("Login bem-sucedido:", user);
    router.push("/tabs/home");
    return user;

  } catch (error: any) {
    // tratamento de erros
    console.log("Erro no login:", error.message);

    // Você pode optar por lançar o erro novamente para tratar no front
    throw error;
  }

  }

  async function getUserById(id: number) {
    
    try {
      const query = "SELECT * FROM usuarios WHERE id = ? LIMIT 1"  
      const statement = await database.getAllAsync(query, [id]);
      const user = statement[0]
      return user; 
    } catch(error) {
            throw error
      }
  }


  return { createUser, login, getAllUsers, getUserById };
}
