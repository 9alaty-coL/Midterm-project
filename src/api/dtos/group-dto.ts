export interface GroupDto {
  /** Group id. */
  readonly _id: string;

  /** Group name. */
  readonly name: string;

  /** Owner id. */
  readonly owner_id: string;

  /** Group image. */
  readonly image: string;

  /** Co-owner id. */
  readonly co_owner_id: string[];

  /** Member id. */
  readonly member_id: string[];
}