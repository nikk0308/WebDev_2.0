import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    register(createUserDto: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
    findOne(id: string): Promise<User | null>;
}
