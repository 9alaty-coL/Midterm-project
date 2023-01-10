import { Notification } from "src/models/notification";
import { NotificationDto } from "../dtos/notification-dto";
import { IMapperFromDto } from "./mappers";

export class NotificationMapper implements IMapperFromDto<NotificationDto, Notification> {
    private static instance: NotificationMapper;
    fromDto(dto: NotificationDto): Notification {
        return new Notification({
            id: dto._id,
            content: dto.content,
            createdAt: new Date(dto.createdAt),
            isRead: dto.isRead,
        })
    }

    public static getInstance(): NotificationMapper {
        if (!NotificationMapper.instance) {
            NotificationMapper.instance = new NotificationMapper();
        }
        return NotificationMapper.instance;
      }
}
