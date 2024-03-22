<script>
    export let data;
    export let form;
    const ruoli = data.ruoli;
    const reparti = data.reparti;
    const dipendenti = data.dipendenti;
</script>

<main>
    <form action="?/modifica" method="post" class="form_modifica">
        <h2>Modifica dipendente</h2>
        <p>{form?.message || ''}</p>
        <label for="dipendente">Dipendente:</label>
        <select id="dipendente" name="dipendente">
            {#each dipendenti as dipendente}
                <option value={dipendente.id}>{dipendente.nome} {dipendente.cognome} {dipendente.eta} {dipendente.ruolo} {dipendente.reparto}</option>
            {/each}
        </select>
        
        <label for="ruolo">Ruolo:</label>
        <select id="ruolo" name="ruolo">
            {#each ruoli as ruolo}
                <option value={ruolo.id}>{ruolo.nome_ruolo}</option>
            {/each}
        </select>

        <label for="reparto">Reparto:</label>
        <select id="reparto" name="reparto">
            {#each reparti as reparto}
                <option value={reparto.id}>{reparto.nome_reparto}</option>
            {/each}
        </select>
        <input type="submit" value="Cambia">
    </form>
</main>