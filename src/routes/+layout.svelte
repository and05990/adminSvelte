<script>
    export let data
    const pathname = data.pathname
    import Header from "$lib/Header.svelte";
</script>

{#if pathname !== "/Cerca" && pathname !== "/Login" && pathname !== "/"}
    <Header />
{/if}
<slot />