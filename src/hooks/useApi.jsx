
export function useApi(setLoading, setError, setMessage) {
    
    const executeRequest = async (successMessage, callback) => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const result = await callback();
            if (successMessage) setMessage(successMessage);
            return result;
        } catch (requestError) {
            setError(requestError.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { executeRequest };
}