import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<import("./post.entity").Post[]>;
}
