import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @OneToMany(() => Comment, comment => comment.post)
    comments!: Comment[];

    @OneToMany(() => Like, like => like.post)
    likes!: Like[];
}