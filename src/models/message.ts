import { timeAgo } from "./notification";

type MessageCreationData = Omit<Message, 'timeAfterCreate'>;


export class Message {
    id: string;
    message: string;
    createdBy: string;
    createdAt: Date;
    constructor(data: MessageCreationData) {
        this.id = data.id;
        this.message = data.message;
        this.createdAt = data.createdAt;
        this.createdBy = data.createdBy;
    }

    get timeAfterCreate(): string {
        return timeAgo.format(this.createdAt)
    }
}

export type PostMessage = Pick<Message, 'message'> & {
    presentationId: string,
    createdBy: string | null,
}