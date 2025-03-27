import { Repository } from 'typeorm';
import { Post } from './post.entity';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    findAll(): Promise<Post[]>;
}
