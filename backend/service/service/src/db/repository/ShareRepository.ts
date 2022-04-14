import { BaseRepository } from '../repository/BaseRepository';
import { Share } from '../entity/share';

export class ShareRepository extends BaseRepository<Share> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createShare = async (ownerId: string, petId: string): Promise<Share> => {
        let newShare: Share = new Share();
        newShare.created = new Date();
        newShare.id = this.generateUUID();
        newShare.ownerId = ownerId;
        newShare.petId = petId;
        return await this.create(newShare);
    }

    deleteShare = async (shareTokenId: string, userId: string): Promise<Share> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .where("id = :id and ownerId = :userId", {
                id: shareTokenId,
                userId: userId
            })
            .execute();
    }

    deleteSharesForPet = async (petId: string, userId: string): Promise<void> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .where("petId: petId and ownerId = :userId", {
                petId: petId,
                userId: userId
            })
            .execute();
    }

    deleteSharesForUser = async (userId: string): Promise<void> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .where("ownerId = :userId", {
                userId: userId
            })
            .execute();
    }

}