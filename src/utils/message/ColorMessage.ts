export default class ColorMessage {
    msg_whiteAndGreen = (white: string, green: string) =>  {
        return `\`\`\`ansi\n[2;37m${white}[2;36m[1;36m${green}[0m[2;36m[0m\n\`\`\``;
    }

    msg_lighterBlue =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "✅ " : "ℹ️ ";
        return `\`\`\`ansi\n[2;94m[1;94m${responseHTTP}${texte}[0m[2;94m[0m\n\`\`\``;
    }

    msg_orange =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "✅ " : "🧸 ";
        return `\`\`\`ansi\n[2;33m[1;33m${responseHTTP}${texte}[0m[2;33m[0m\n\`\`\``;
    }

    msg_green =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "✅ " : "✔️ ";
        return `\`\`\`ansi\n[2;36m[1;36m${responseHTTP}${texte}[0m[2;36m[0m\n\`\`\``;
    }

    msg_pink =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "✅ " : "👾";
        return `\`\`\`ansi\n[2;35m[1;35m${responseHTTP}${texte}[0m[2;35m[0m\n\`\`\``;
    }

    msg_purple =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "✅ " : "👾 ";
        return `\`\`\`ansi\n[2;35m[1;35m${responseHTTP}${texte}[0m[2;35m[0m\n\`\`\``;
    }

    msg_blue =(texte: string) => {
        return `\`\`\`ansi\n[2;34m[1;34m🐟 ${texte}[0m[2;34m[0m\n\`\`\``;
    }

    msg_red =(texte: string, choose?: string) => {
        let responseHTTP = choose === "ok" ? "❌ [Error] - " : "";
        return `\`\`\`ansi\n[2;31m[1;31m${responseHTTP}${texte}[0m[2;31m[0m\n\`\`\``;
    }

    msg_white =(texte: string) => {
        return `\`\`\`ansi\n[2;36m[1;36m${texte}[0m[2;36m[0m\n\`\`\``;
    }

    msg_yellow =(texte: string) => {
        return `\`\`\`ansi\n[2;33m[1;33m🧔‍♀️ ${texte}[0m[2;33m[0m\n\`\`\``;
    }
}
