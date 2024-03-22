export const load = async ({ url }) => {
    console.log(url.pathname);
    const pathname = url.pathname;

    return {
        pathname
    }
}