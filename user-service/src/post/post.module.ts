import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, Comment, Like])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}