import { Message, PostMessage } from "src/models/message";
import { http } from "..";
import { IData } from "../dtos/data-dto";
import { MessageDto } from "../dtos/message-dto";
import { messageMapper } from "../mappers/message.mapper";
import { LocalStorageService } from "./local-storage";

const INITIAL_SIZE = 10;
const INITIAL_INDEX = 0;

const MESSAGE_ROUTE = 'api/chat';

const ANONYMOUS_NAME = 'ANONYMOUS_NAME';

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
    export async function loadMoreMessages(presentationId: string): Promise<Message[]> {
        currentPageIndex += INITIAL_SIZE;
        const { data } = await http.get<IData<{chats: MessageDto[]}>>(MESSAGE_ROUTE + '/' + presentationId, {
            params: {
                limitSize: INITIAL_SIZE,
                index: currentPageIndex,
            }
        });
        return data.data.chats.map(dto => messageMapper.fromDto(dto));
    }

    export async function sendMessage(messageData: PostMessage): Promise<Message> {
        const messagePost = {...messageData};
        if (messagePost.createdBy == null) {
            let name = localStorage.getItem(ANONYMOUS_NAME);
            if (name == null) {
                name = `Anonymous ${Math.ceil(Math.random() * 1000)}` 
                localStorage.setItem(ANONYMOUS_NAME, name);
            }
            messagePost.createdBy = name;
        }
        const { data } = await http.post<IData<{ChatSaved: MessageDto}>>(MESSAGE_ROUTE + '/add', 
            messageMapper.toPostDto(messagePost),
        )
        return messageMapper.fromDto(data.data.ChatSaved);
    }
}
