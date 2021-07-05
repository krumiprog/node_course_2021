export class CreateBoardDto {
  title: string;
  columns: {
    title: string;
    order: number;
  }[];
}
