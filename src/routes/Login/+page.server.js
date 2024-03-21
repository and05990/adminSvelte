export const actions = {
    login: async({ request }) => {
        try {
            const data = await request.formData();
            const username = data.get('username');
            const password = data.get('password');
            console.log(username, password);

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
            
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: 'Errore interno'
            });
        }
    }
}