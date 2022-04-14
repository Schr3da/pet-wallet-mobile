
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    Timestamp,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
    Index
} from 'typeorm';

@Entity()
export class Note {

    @PrimaryColumn("varchar", { length: 40, nullable: false })
    id: string;

    @Column("varchar", { length: 40, nullable: false })
    @Index()
    petId: string;

    @Column("varchar", { nullable: false })
    title: string;

    @Column("varchar", { nullable: false })
    body: string;

    @Column("timestamp", { nullable: false })
    created: Date;

    constructor() {
        this.id = '';
        this.petId = '';
        this.title = '';
        this.body = '';
        this.created = new Date();
    }
}