import { mysqlconnFn } from "../../hooks.server";

export const load = async () => {
    const conn = await mysqlconnFn();
    const dipendenti = await conn.query('SELECT Dipendenti.nome, Dipendenti.cognome, Dipendenti.eta, Dipendenti.sesso, Ruolo.nome_ruolo AS ruolo, Ruolo.stipendio AS stipendio, Reparti.nome_reparto AS reparto FROM Dipendenti JOIN Ruolo ON Dipendenti.fkRuolo = Ruolo.id JOIN Reparti ON Dipendenti.fkReparto = Reparti.id ORDER BY Dipendenti.cognome ASC')
        .then(([rows, fields]) => {
            return rows;
        });

    return {
        dipendenti
    };
}