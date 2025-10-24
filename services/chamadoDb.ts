import { useSQLiteContext } from "expo-sqlite"
import { useUserDatabase } from "./userDb";

export type ChamadoDatabase = {
    id: number,
    titulo: string
    descricao: string,
    status: string,
    usuario_id: number
}

export function useChamadoDatabase(){
    const database = useSQLiteContext();
    const UserDatabase = useUserDatabase();

    async function create(data: Omit<ChamadoDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO chamados (titulo, descricao, status, usuario_id) VALUES ($titulo, $descricao, $status, $usuario_id)"
        )
        try {
            const result = await statement.executeAsync({
                $titulo: data.titulo,
                $descricao: data.descricao,
                $status: data.status,
                $usuario_id: data.usuario_id
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString();
            return{ insertedRowId }
        } catch (error) {
            throw error 
        }finally{
            await statement.finalizeAsync()
        }
    }

    async function getAll(search: string) {
        try{
            const query = "SELECT * FROM chamados WHERE titulo LIKE ?"
        
            const response = await database.getAllAsync<ChamadoDatabase>(query, `%${search}`)
            return (response)
        }catch(error){
            throw(error)
        }
    }

    async function getById(id: number) {
        

        try {
            const query = "SELECT * FROM chamados WHERE id = ? LIMIT 1"
            const statement = await database.getFirstAsync(query, [id]);

            let usuarioNome: string | null = null;
            const usuario = await UserDatabase.getUserById(statement.usuario_id);
            usuarioNome = usuario?.nome ?? null;

            console.log(usuarioNome);
            return {statement, usuarioNome};
        } catch(error) {
            throw error
        }
    }

    return { create, getAll, getById }
}