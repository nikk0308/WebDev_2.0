import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
    getUserById(id: string): Promise<User | null>;
}
