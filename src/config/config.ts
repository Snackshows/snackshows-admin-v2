export const envConfig = () => {
    return {
        api: import.meta.env.VITE_API_BASE_URL,
    };
};