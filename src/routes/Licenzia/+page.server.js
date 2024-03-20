import { mysqlconnFn } from "../../hooks.server";
import { fail } from "@sveltejs/kit"

export const load = async () => {
    const conn = await mysqlconnFn();
    const dipendenti = await conn.query('SELECT id, nome, cognome, eta FROM Dipendenti').then(([rows, fields]) => {
            return rows;
        });
    return {
        dipendenti
    };
}

export const actions = {
    licenzia: async ({ request }) => {
        try {
            const data = await request.formData();
            const id = data.get('dipendente');
            console.log(id)
            const conn = await mysqlconnFn();
            await conn.query('DELETE FROM Dipendenti WHERE id = ?', [id]);

            return {
                message: 'Dipendente licenziato con successo'
            }
        } catch (error) {
            return fail(500, {
                message: error.message
            });
        }
    }
}