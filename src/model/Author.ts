import { PartialAuthorData } from "../types/partialAuthorData.js";

export default class Author {
    id: string;
    bot: boolean;
    name: string;

    constructor(data: PartialAuthorData) {
        this.id = data.author.id;
        this.bot = data.author.bot;
        this.name = data.author.username;
    }
}
