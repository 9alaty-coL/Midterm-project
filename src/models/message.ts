import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

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