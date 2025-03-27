import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Post, post => post.likes)
    post!: Post;
}