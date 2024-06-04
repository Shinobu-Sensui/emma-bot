export const time = (time:number):string => {
    const elapsedTime = Date.now() - time;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    return `Le programme est en route depuis : ${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`;
}