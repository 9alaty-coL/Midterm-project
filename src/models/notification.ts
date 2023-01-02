import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
export const timeAgo = new TimeAgo('en-US')


type NotificationCreationData = Omit<Notification, 'timeAfterCreate'>;

export class Notification {
    public id: string;
    public content: string;
    public isRead: boolean;
    public createdAt: Date;
    constructor(data: NotificationCreationData) {
        this.id = data.id;
        this.content = data.content;
        this.isRead = data.isRead;
        this.createdAt = data.createdAt;
    }

    get timeAfterCreate(): string {
        return timeAgo.format(this.createdAt)
    }
}