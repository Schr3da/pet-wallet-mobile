import { BaseRepository } from '../repository/BaseRepository';
import { Pet } from '../entity/pet';

export class PetRepository extends BaseRepository<Pet> {

    rawRepository: any;

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createPet = async (pet: Pet): Promise<Pet> => {
        pet.id = this.generateUUID();
        pet.created = new Date();
        return await this.create(pet);
    }

    updatePet = async (pet: Pet): Promise<Pet> => {
        return await this.rawRepository.update(
            pet.id,
            pet
        );
    }

    deletePet = async (petId: string, userId: string): Promise<Pet> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(Pet)
            .where("id = :id and userId = :userId", {
                id: petId,
                userId: userId
            })
            .execute();
    }

    findPetById = async (id: string): Promise<Pet | undefined> => {
        return await this.findById(id);
    }

    findPetByNameAndType = async (name: string, type: string, userId: string): Promise<Pet[]> => {
        return await this.rawRepository.createQueryBuilder('pets')
            .where("pets.name = :name and pets.type = :type and pets.userId = :userId",
                {
                    name: name,
                    type: type,
                    userId: userId
                })
            .getMany();
    }

    findPetsForUser = async (userId: string): Promise<Pet[]> => {
        return await this.rawRepository.createQueryBuilder('pets')
            .where("pets.userId = :userId", { userId: userId })
            .getMany();
    }
}