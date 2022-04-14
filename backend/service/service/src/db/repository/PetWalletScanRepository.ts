import { BaseRepository } from '../repository/BaseRepository';
import { Pet } from '../entity/pet';
import { PetWalletEntry, PetWalletScan } from '../entity/wallet';

export class PetWalletScanRepository extends BaseRepository<PetWalletScan> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createWalletScan = async (entry: PetWalletScan): Promise<PetWalletScan> => {
        return await this.create(entry);
    }

    findWalletScansForPet = async (petId: string): Promise<PetWalletScan[] | undefined> => {
        return await this.rawRepository
            .createQueryBuilder('PetWalletScan')
            .where("PetWalletScan.petId = :petId", { petId: petId })
            .getMany();
    }

    deleteWalletScan = async (walletScanId: string, petId: string): Promise<PetWalletScan> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(PetWalletScan)
            .where("id = :id and petId = :petId",
                {
                    id: walletScanId,
                    petId: petId
                })
            .execute();
    }

    deleteWalletScansForPet = async (petId: string): Promise<PetWalletScan> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(PetWalletScan)
            .where("petId = :petId", { petId: petId })
            .execute();
    }

}