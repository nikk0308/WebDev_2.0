import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    text!: string;

    @ManyToOne(() => Post, post => post.comments)
    post!: Post;
}