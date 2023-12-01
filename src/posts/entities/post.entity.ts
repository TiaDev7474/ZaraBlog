export class PostEntity {
  post_id: string;
  author: IUser;
  banner_url: string;
  content: string;
  reading_time: number;
  title: string;
  read_by: Partial<IUser>[];
  category: string[];
  reviews: number;
  created_at: Date;
  reaction: IReaction[];
  tag: ITag[];
}

interface IUser {
  author_id: string;
  photo: string;
  firstname: string;
  lastname: string;
}
interface IReaction {
  reaction_id: string;
  owner_id: string;
  type: string;
}

interface ITag {
  tag_id: string;
  designation: string;
}
