import { mysqlconnFn } from "../../hooks.server";
import { fail, redirect } from "@sveltejs/kit";
import CryptoJs from 'crypto-js';

export const actions = {
    login: async ({ request }) => {
            const data = await request.formData();
            const username = data.get('username');
            const password = CryptoJs.MD5(data.get('password')).toString();

            if (!username || !password) {
                return fail(400, {
                    message: '*tutti i campi sono obbligatori'
                });
            }

            const conn = await mysqlconnFn();
            const user = await conn.query('SELECT * FROM Utenti WHERE username = ?', [username])
                .then(([rows, fields]) => {
                    return rows[0];
                });

            if (user.password !== password) {
                return fail(400, {
                    message: 'Credenziali non valide'
                });
            }

            throw redirect(303, '/Home');
    }
};
