<script>
	import Header from '$lib/Header.svelte';
	export let data;
	const dipendenti = data.dipendenti;
</script>

<main>
	<Header />
    <h2>Lista dipendenti</h2>
    <table border='1' class='tabella'>
        <tr>
            <th aria-sort="value">Cognome</th>
            <th>Nome</th>
            <th>Età</th>
            <th>Sesso</th>
            <th>Ruolo</th>
            <th>Reparto</th>
            <th>Stipendio</th>
        </tr>
        {#each dipendenti as dipendente}
            <tr>
                <td>{dipendente.cognome}</td>
                <td>{dipendente.nome}</td>
                <td>{dipendente.eta}</td>
                <td>{dipendente.sesso}</td>
                <td>{dipendente.ruolo}</td>
                <td>{dipendente.reparto}</td>
                <td>{dipendente.stipendio}</td>
            </tr>
        {/each}
    </table>
</main>
