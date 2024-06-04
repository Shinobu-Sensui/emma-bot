type CallbackFunction<T = any> = (...args: any[]) => Promise<T>;

export const perf = async <T>(callback: CallbackFunction<T>): Promise<{ time: string; response: T }> => {
    try {
        const start = performance.now();

        const response = await callback();

        const end = performance.now();
        const ellapsed = end - start;

        return {
            time: `[${ellapsed.toFixed(2)}ms]`,
            response
        };

    } catch (error) {
        console.error('Error occurred during performance measurement:', error);
        throw new Error("Un problème est survenu.");
    }
}
