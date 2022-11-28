export interface Group {
  /** Group id. */
  id: string;

  /** Group name. */
  readonly name: string;

  /** Group image. */
  readonly image: string;

  /** Owner id. */
  readonly ownerId: string;

  /** Co-owner id. */
  readonly coOwnerId: readonly string[];

  /** Member id. */
  readonly memberId: readonly string[];
}