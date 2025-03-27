import { Comment } from './comment.entity';
import { Like } from './like.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    comments: Comment[];
    likes: Like[];
}
