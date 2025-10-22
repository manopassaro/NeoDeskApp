import { useSQLiteContext } from "expo-sqlite"

export type ChamadoDatabase = {
    id: number,
    titulo: string
    descricao: string,
    status: string
}

export function useChamadoDatabase(){
    const database = useSQLiteContext();

    async function create(data: Omit<ChamadoDatabase, "id">) {
        const statement = await database.prepareAsync(
        "INSERT INTO chamados (titulo, descricao, status) VALUES ($titulo, $descricao, $status)"
        )
        try {
            const result = await statement.executeAsync({
                $titulo: data.titulo,
                $descricao: data.descricao,
                $status: data.status
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

    return { create, getAll }
}