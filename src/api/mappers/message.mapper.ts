import { Message, PostMessage } from "src/models/message";
import { MessageDto, PostMessageDto } from "../dtos/message-dto";
import { IMapperFromDto } from "./mappers";

export class MessageMapper implements IMapperFromDto<MessageDto, Message> {
    private static instance: MessageMapper;
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

    public static getInstance(): MessageMapper {
        if (!MessageMapper.instance) {
            MessageMapper.instance = new MessageMapper();
        }
        return MessageMapper.instance;
      }
}
