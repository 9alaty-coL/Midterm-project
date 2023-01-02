export interface MessageDto {
    _id: string;
    message: string;
    createdUserName: string;
    createdAt: string;
}

export type PostMessageDto = Pick<MessageDto, 'message' | 'createdUserName'> & {
    presentationId: string;
}