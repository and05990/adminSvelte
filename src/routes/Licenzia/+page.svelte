<script>
    export let form;
    export let data;
    const dipendenti = data.dipendenti;
</script>

<main>
    <form action="?/licenzia" method="post">
        <h2>Licenzia un dipendente</h2>
        <p>{form?.message || ''}</p>
        <label for="dipendente">Dipendente:</label>
        <select id="dipendente" name="dipendente">
            {#each dipendenti as dipendente}
                <option value={dipendente.id}>{dipendente.cognome} {dipendente.nome} {dipendente.eta}</option>
            {/each}
        </select>
        <input type="submit" value="Licenzia">
    </form>
</main>