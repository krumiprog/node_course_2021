export interface IUser {
  name: string;
  login: string;
  password: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoard {
  title: string;
  columns: IColumn[];
}

export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
