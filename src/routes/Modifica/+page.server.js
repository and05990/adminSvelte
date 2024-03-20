import { mysqlconnFn } from "../../hooks.server";
import { fail } from "@sveltejs/kit"

export const load = async () => {
    const conn = await mysqlconnFn();
    const dipendenti = await conn.query('SELECT d.id, d.nome, d.cognome, d.eta, r.nome_ruolo AS ruolo, rep.nome_reparto AS reparto FROM Dipendenti d JOIN Ruolo r ON d.fkRuolo = r.id JOIN Reparti rep ON d.fkReparto = rep.id')
        .then(([rows, fields]) => {
            return rows;
        });
        
    const ruoli = await conn.query('SELECT id, nome_ruolo FROM Ruolo').then(([rows, fields]) => {
            return rows;
        });
    
    const reparti = await conn.query('SELECT id, nome_reparto FROM Reparti ORDER BY nome_reparto ASC').then(([rows, fields]) => {
            return rows;
        });
    return {
        dipendenti,
        ruoli,
        reparti
    };
}

export const actions = {
    modifica: async ({ request }) => {
        try {
            const data = await request.formData();
            const id = data.get('dipendente');
            const ruolo = data.get('ruolo');
            const reparto = data.get('reparto');

            if (ruolo === '4' && reparto !== '1' || ruolo !== '4' && reparto === '1') {
                return fail(400, {
                    message: '*se il ruolo è Segretario il reparto deve essere Segreteria e viceversa'
                });
            }

            const conn = await mysqlconnFn();
            await conn.query('UPDATE Dipendenti SET fkRuolo = ?, fkReparto = ? WHERE id = ?', [ruolo, reparto, id]);
            
            return {
                message: 'Dipendente modificato con successo'
            }
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: 'Errore interno'
            });
        }
    }
}