import { timeAgo } from "./notification";

type QuestionCreationData = Omit<Question, 'timeAfterCreate'>

export class Question {
    public createdUserName: string;
    public isAnswered: boolean;
    public id: string;
    public voteCount: number;
    public votedUsers: string[];
    public createdAt: Date;
    public description: string;
    get timeAfterCreate(): string {
        return timeAgo.format(this.createdAt)
    }

    public constructor(data: QuestionCreationData) {
        this.isAnswered = data.isAnswered;
        this.id = data.id;
        this.voteCount = data.voteCount;
        this.createdAt = data.createdAt;
        this.votedUsers = data.votedUsers;
        this.description = data.description;
        this.createdUserName = data.createdUserName;
    }
}

export type PostQuestion = Pick<Question, 'description'>;