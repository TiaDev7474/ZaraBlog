export class UpdatePostDto {
  title?: string;
  content: string;
  read_time: number;
  constructor(partial: Partial<UpdatePostDto>) {
    Object.assign(this, partial);
  }
}
