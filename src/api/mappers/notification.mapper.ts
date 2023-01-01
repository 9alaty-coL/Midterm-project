import { Notification } from "src/models/notification";
import { NotificationDto } from "../dtos/notification-dto";
import { IMapperFromDto } from "./mappers";

class NotificationMapper implements IMapperFromDto<NotificationDto, Notification> {
    fromDto(dto: NotificationDto): Notification {
        return new Notification({
            id: dto._id,
            content: dto.content,
            createdAt: new Date(dto.createdAt),
            isRead: dto.isRead,
        })
    }
}

export const notificationMapper = new NotificationMapper();
