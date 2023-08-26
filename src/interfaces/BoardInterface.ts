export interface CreateBoard {
  displayName: string;
  boardType: string;
  recipient: string;
}

export interface IBoard {
  boardId: string;
  boardType: string;
  cards: ICard[];
  displayName: string;
  recipient: string;
  createdAt: string;
  _id: string;
}

export interface ICard {
  msg: string;
  madeBy: string;
  _id?: string;
}
