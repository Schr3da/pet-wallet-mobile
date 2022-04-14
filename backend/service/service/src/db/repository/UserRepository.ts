import { BaseRepository } from '../repository/BaseRepository';
import { User } from '../entity/user';

export class UserRepository extends BaseRepository<User> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createUser = async (nickname: string) : Promise<User> => {
        let newUser: User = new User();
        newUser.id = this.generateUUID();
        newUser.token = this.generateUUID();
        newUser.nickname = nickname;
        return await this.create(newUser);
    }

    updateUser = async (user: User) : Promise<User> => {
        return await this.rawRepository.update({ token: user.token }, { nickname: user.nickname });
    }

    numOfUsers = async () => {
        return await this.rawRepository.createQueryBuilder('users').select('id').getCount();
    }

    findUserByToken = async (token: string) : Promise<User> => {
        return await this.rawRepository.createQueryBuilder('users').where("users.token = :token", { token: token }).getOne();
    }

}