import { http } from "..";
import { NotificationDto } from "../dtos/notification-dto";
import { notificationMapper } from "../mappers/notification.mapper";
import { Notification } from "src/models/notification";
import { IData } from "../dtos/data-dto";

const INITIAL_SIZE = 10;
const INITIAL_INDEX = 0;

const NOTIFICATION_ROUTE = 'api/notification';

export namespace NotificationApiService {
    let currentPageIndex = INITIAL_INDEX;
    export async function getNotifications(): Promise<Notification[]> {
        currentPageIndex = INITIAL_INDEX;
        const { data } = await http.get<IData<{notifications: NotificationDto[]}>>(NOTIFICATION_ROUTE, {
            params: {
                limitSize: INITIAL_SIZE,
                index: currentPageIndex,
            }
        });
        return data.data.notifications.map(dto => notificationMapper.fromDto(dto));
    }

    export async function loadMoreNotifications(): Promise<Notification[]> {
        currentPageIndex += INITIAL_SIZE;
        const { data } = await http.get<IData<{notifications: NotificationDto[]}>>(NOTIFICATION_ROUTE, {
            params: {
                limitSize: INITIAL_SIZE,
                index: currentPageIndex,
            }
        });
        return data.data.notifications.map(dto => notificationMapper.fromDto(dto));
    }

    export async function notifyUser(userId: string, content: string): Promise<Notification> {
        const { data } = await http.post<IData<{NotificationSaved: NotificationDto}>>(NOTIFICATION_ROUTE + '/add', {
            userId,
            content,
        })
        return notificationMapper.fromDto(data.data.NotificationSaved);
    }
}
