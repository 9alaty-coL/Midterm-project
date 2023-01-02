import { Message, PostMessage } from "src/models/message";
import { MessageDto, PostMessageDto } from "../dtos/message-dto";
import { IMapperFromDto } from "./mappers";

class MessageMapper implements IMapperFromDto<MessageDto, Message> {
    fromDto(dto: MessageDto): Message {
        return new Message({
            id: dto._id,
            message: dto.message,
            createdAt: new Date(dto.createdAt),
            createdBy: dto.createdUserName,
        })
    }

    toPostDto(data: PostMessage): PostMessageDto {
        return {
            message: data.message,
            createdUserName: data.createdBy ?? 'anonymous',
            presentationId: data.presentationId,
        }
    }
}

export const messageMapper = new MessageMapper();