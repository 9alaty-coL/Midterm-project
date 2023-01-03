export interface QuestionDto {
    _id: string;
    description: string;
    isAnswered: boolean;
    votedUsers: string[];
    createdAt: string;
    voteCount: number;
    createdUserName: string;
}