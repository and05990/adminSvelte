import { mysqlconnFn } from "../../hooks.server";
import { fail } from "@sveltejs/kit"

export const load = async () => {
    const conn = await mysqlconnFn();
    const ruoli = await conn.query('SELECT id, nome_ruolo FROM Ruolo').then(([rows, fields]) => {
            return rows;
        });
    
    const reparti = await conn.query('SELECT id, nome_reparto FROM Reparti ORDER BY nome_reparto ASC').then(([rows, fields]) => {
            return rows;
        });
    return {
        ruoli,
        reparti
    };
}

export const actions = {
    assumi: async ({ request }) => {
        try {
            const data = await request.formData();
            const nome = data.get('nome');
            const cognome = data.get('cognome');
            const eta = data.get('eta');
            const sesso = data.get('sesso');
            const ruolo = data.get('ruolo');
            const reparto = data.get('reparto');

            if (!nome || !cognome || !eta) {
                return fail(400, {
                    message: '*tutti i campi sono obbligatori'
                })
            }

            if (eta < 18 || eta > 65) {
                return fail(400, {
                    message: '*l\'età deve essere compresa tra 18 e 65'
                });
            }

            if (nome.match(/[0-9]/) || cognome.match(/[0-9]/) || nome.match(/[!@#$%^&*(),.?":{}|<>-_]/) || cognome.match(/[!@#$%^&*(),.?":{}|<>-_]/)) {
                return fail(400, {
                    message: '*il nome e il cognome non possono contenere numeri o caratteri speciali'
                });
            }

            if (ruolo === '4' && reparto !== '1' || ruolo !== '4' && reparto === '1') {
                return fail(400, {
                    message: '*se il ruolo è Segretario il reparto deve essere Segreteria e viceversa'
                });
            }

            const conn = await mysqlconnFn();
            await conn.query('INSERT INTO Dipendenti (nome, cognome, eta, sesso, fkRuolo, fkReparto) VALUES (?, ?, ?, ?, ?, ?)', [nome, cognome, eta, sesso, ruolo, reparto]);
            
            return {
                message: 'Dipendente assunto con successo'
            }
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: 'Errore interno'
            });
        }
    }
}