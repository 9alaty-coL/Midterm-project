import { Message } from "src/models/message";
import { MessageDto } from "../dtos/message-dto";
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
}

export const messageMapper = new MessageMapper();