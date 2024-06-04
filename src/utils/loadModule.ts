import { pathToFileURL } from 'url';
import path from 'path';

export const loadModule = async (modulePath:string, functionName:string) => {
    try {
        const fileUrl = pathToFileURL(path.resolve(modulePath)).href;
        const module = await import(fileUrl);
        console.log(fileUrl)
        if (module[functionName] && typeof module[functionName] === 'function') {
            return module[functionName];
        } else {
            throw new Error(`${functionName} n'est pas défini ou n'est pas une fonction dans ${modulePath}`);
        }
    } catch (error) {
        console.error(`Erreur lors de l'importation du module ${modulePath}:`, error);
        throw error;
    }
};
