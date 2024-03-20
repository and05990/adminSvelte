<script>
    import Header from "$lib/Header.svelte";
    export let data;
    export let form;
    const ruoli = data.ruoli;
    const reparti = data.reparti;
</script>

<main>
    <Header />
    <form action="?/assumi" method="post">
        <h2>Assumi un nuovo dipendente</h2>
        <p>{form?.message || ''}</p>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" placeholder="Nome" required>

        <label for="cognome">Cognome:</label>
        <input type="text" id="cognome" name="cognome" placeholder="Cognome" required>

        <label for="eta">Età:</label>
        <input type="number" id="eta" name="eta" placeholder="Età" required>

        <label for="sesso">Sesso:</label>
        <select id="sesso" name="sesso">
            <option value="M">Maschio</option>
            <option value="F">Femmina</option>
        </select>

        <select id="ruolo" name="ruolo">
            <label for="ruolo">Ruolo:</label>
                {#each ruoli as ruolo}
                    <option value={ruolo.id}>{ruolo.nome_ruolo}</option>
                {/each}
        </select>

        <select id="reparto" name="reparto">
            <label for="reparto">Reparto:</label>
                {#each reparti as reparto}
                    <option value={reparto.id}>{reparto.nome_reparto}</option>
                {/each}
        </select>

        <input type="submit" value="Assumi">
    </form>
</main>