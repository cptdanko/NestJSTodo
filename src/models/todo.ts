export class Todo {
    id: number;
    text: string;
    created?: Date;

    constructor(id: number, text: string, created?: Date) {
        this.id = id;
        this.text = text;
        this.created = created;
    }
}
