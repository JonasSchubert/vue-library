export interface Entity {
  id: string;
  dateTimeAdded: Date;
  userAddedId: string;
  userAdded: string;
  dateTimeUpdated?: Date;
  userUpdatedId?: string;
  userUpdated?: string;
}
