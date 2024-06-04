export interface PartialManagement {
    [key: string]: {
        guildName:string;
        admins: string[];
        authorization: boolean;
        channelsAuthorization: string[],
        commandsMapping:
        {
            fileName: string,
            commandNames: string[]
        }[]

    }
}


