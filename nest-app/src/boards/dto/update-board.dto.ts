import { IColumn } from '../interfaces/column.interface';

export class UpdateBoardDto {
  title: string;
  columns: IColumn[];
}
