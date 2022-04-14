
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    JoinTable,
    Index,
    Unique
} from 'typeorm';

@Entity()
export class NewsletterRegistration {

    @PrimaryColumn("varchar", { length: 40 })
    id: string;

    @Column("varchar", { length: 200, nullable: false, unique: true })
    email: string;

    @Column("varchar", { length: 30, nullable: false })
    text: string;

    constructor() {
        this.id = '';
        this.email = '';
        this.text = '';
    }
}