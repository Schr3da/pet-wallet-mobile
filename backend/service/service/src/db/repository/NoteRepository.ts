import { BaseRepository } from '../repository/BaseRepository';
import { Note } from '../entity/note';

export class NoteRepository extends BaseRepository<Note> {

    rawRepository: any;

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    createNote = async (petId: string, title: string, body: string): Promise<Note> => {
        let note = new Note();
        note.id = this.generateUUID();
        note.petId = petId;
        note.title = title;
        note.body = body;
        return await this.create(note);
    }

    deleteNotesForPet = async (petId: string, userId: string): Promise<any> => {
        return await this.rawRepository
            .createQueryBuilder()
            .delete()
            .from(Note)
            .where("petId = :petId", {
                petId: petId
            })
            .execute();
    }

    findNotesForPet = async (petId: string): Promise<Note[] | undefined> => {
        return await this.rawRepository.createQueryBuilder('notes')
            .where("notes.petId = :petId",
                {
                    petId: petId
                })
            .getMany();
    }
}