export interface QuestionDto {
    _id: string;
    description: string;
    isAnswered: boolean;
    votedUsers: string[];
    createdAt: string;
    voteCount: number;
    createdUserName: string;
}

export type PostQuestionDto = Pick<QuestionDto, 'description' | 'createdUserName'> & {
  presentationId: string;
}
