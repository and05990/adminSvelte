<script>
    export let form;
</script>

<main>
    <h2>LOGIN</h2>
    <p>{form?.message || ''}</p>
    <form action="?/login" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username" placeholder="Username">
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Accedi">
    </form>
    <p>*Attenzione solo l'amministaratore può accedere al portale</p>
</main>