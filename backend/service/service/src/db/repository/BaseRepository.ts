import { v4 as uuidv4 } from 'uuid';

export class BaseRepository<T> {

    protected rawRepository: any;

    public constructor(rawRepository: any) {
        this.rawRepository = rawRepository;
    }

    public create = async(entity : T) : Promise<T> => {
        return await this.rawRepository.save(entity);
    }

    public delete = async(id: string) : Promise<T | undefined> => {
        return await this.rawRepository.delete(id);
    }

    public findById = async(id: string) : Promise<T | undefined> => {
        return await this.rawRepository.findOne({ id: id });
    }

    public generateUUID(): string {
        return uuidv4();
    }

}