import { Message } from "src/models/message";
import { http } from "..";
import { IData } from "../dtos/data-dto";
import { MessageDto } from "../dtos/message-dto";
import { messageMapper } from "../mappers/message.mapper";

const INITIAL_SIZE = 10;
const INITIAL_INDEX = 0;

const MESSAGE_ROUTE = 'api/chat';

export namespace MessageApiService {
    let currentPageIndex = INITIAL_INDEX;
    export async function getMessageOfPresentation(presentationId: string): Promise<Message[]> {
        currentPageIndex = INITIAL_INDEX;
        const { data } = await http.get<IData<{chats: MessageDto[]}>>(MESSAGE_ROUTE + '/' + presentationId, {
            params: {
                limitSize: INITIAL_SIZE,
                index: currentPageIndex,
            }        })
        return data.data.chats.map(dto => messageMapper.fromDto(dto));
    }
    export async function loadMoreMessages(): Promise<Message[]> {
        currentPageIndex += INITIAL_SIZE;
        const { data } = await http.get<IData<{chats: MessageDto[]}>>(MESSAGE_ROUTE, {
            params: {
                limitSize: INITIAL_SIZE,
                index: currentPageIndex,
            }
        });
        return data.data.chats.map(dto => messageMapper.fromDto(dto));
    }
}
