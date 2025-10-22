import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

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
    const query = `
      SELECT * FROM usuarios
      WHERE email = ? AND senha = ? AND is_active = 1
      LIMIT 1;
    `;

    // ⚠️ parâmetros separados, não em array!
    const result = await database.getFirstAsync<UserDatabase>(query, [data.email, data.senha]);

    if (result) {
      console.log("✅ Login bem-sucedido:", result);
      return result;
    } else {
      console.log("❌ Usuário não encontrado ou inativo", result, `%${data.senha}`);
      return null;
    }
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}


//     async function login(email: string, senha: string) {
//     try {
//       // Consulta o usuário com o email informado
//       const query = "SELECT * FROM usuarios WHERE email = ?";
//       const users = await database.getAllAsync(query, `%${email}`);

//       if (users.length === 0) {
//         throw new Error("Usuário não encontrado");
//       }

//       const user = users[0];

//       // Aqui seria feita a verificação de senha real (ex: bcrypt)
//       // Por simplicidade, estamos comparando diretamente
//       if (user.senha !== senha) {
//         throw new Error("Senha incorreta");
//       }

//       // ✅ LOGIN BEM-SUCEDIDO → redireciona para tela principal
//       router.push("/tabs/home");

//       return user; // opcional, caso queira usar o retorno
//     } catch (error) {
//       console.error("Erro no login:", error);
//       throw error;
//     }
//   }

  return { createUser, login, getAllUsers };
}
