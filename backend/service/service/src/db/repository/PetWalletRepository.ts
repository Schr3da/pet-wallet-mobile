import { BaseRepository } from '../repository/BaseRepository';
import { Pet } from '../entity/pet';
import { PetWalletEntry, PetWalletScan } from '../entity/wallet';

export class PetWalletRepository extends BaseRepository<PetWalletEntry> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createWalletEntry = async (entry: PetWalletEntry): Promise<PetWalletEntry> => {
        return await this.create(entry);
    }

    updateWalletEntry = async (entry: PetWalletEntry): Promise<PetWalletEntry> => {
        return await this.rawRepository.update(
            { id: entry.id },
            {
                medicineId: entry.medicineId,
                title: entry.title,
                description: entry.description,
                date: entry.date
            });
    }

    deleteWalletEntry = async (walletEntryId: string, petId: string): Promise<Pet> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(PetWalletEntry)
            .where("id = :id and petId = :petId", {
                id: walletEntryId,
                petId: petId
            })
            .execute();
    }

    deleteWalletEntryForPet = async (petId: string): Promise<Pet> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(PetWalletEntry)
            .where("petId = :petId", {
                petId: petId
            })
            .execute();
    }

    findWalletEntriesForPet = async (petId: string): Promise<PetWalletEntry[] | undefined> => {
        return await this.rawRepository
            .createQueryBuilder('PetWalletEntry')
            .where("PetWalletEntry.petId = :petId", { petId: petId })
            .getMany();
    }
}