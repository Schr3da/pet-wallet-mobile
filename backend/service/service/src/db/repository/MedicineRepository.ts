import { BaseRepository } from '../repository/BaseRepository';
import { Pet } from '../entity/pet';
import { Medicine } from '../entity/medicine';

export class MedicineRepository extends BaseRepository<Medicine> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    findMedicineById = async (id: string) : Promise<Medicine> => {
        return await this.rawRepository.findOne({ id: id, relations: ['infos'] });
    }

    findMedicineBySearchTerm = async (searchTerm: string) : Promise<Medicine> => {
        return await this.rawRepository.findOne({ searchTerm: searchTerm, relations: ['infos'] });
    }

    findMedicines = async () : Promise<Medicine[] | undefined> => {
        return await this.rawRepository.find({ relations: ['infos'] });
    }

}