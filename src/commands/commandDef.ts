import { sendDefRequest } from "../config/defsocket.js"; 



export const commandDef = async (channelId: string, commands: string[]) => {
    const response = sendDefRequest(commands[0])
    console.log(response)

}