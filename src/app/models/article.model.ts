import { Comment } from './comment.model';

export interface Article {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  content: string;
  comments: Comment[];
  deleteLoading?: boolean;
}
