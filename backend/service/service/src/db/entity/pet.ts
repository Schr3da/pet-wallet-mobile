
import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';

import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class Pet {

    @PrimaryColumn("varchar", { length: 40, nullable: false })
    id: string;

    @Column("varchar", { length: 40, nullable: false })
    @Index()
    userId: string;

    @Column("varchar", { length: 20, nullable: false })
    name: string;

    // avatar image as base64
    @Column("varchar", { nullable: true })
    avatarImage: string | null;

    @Column("varchar", { length: 20, nullable: false })
    type: string;

    @Column("timestamp", { nullable: true })
    dateOfBirth: Date | null;

    @Column("timestamp", {nullable: false})
    created: Date;

    constructor() {
        this.id = '';
        this.userId = '';
        this.name = '';
        this.avatarImage = null;
        this.type = '';
        this.dateOfBirth = null;
        this.created = new Date();
    }
}