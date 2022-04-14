import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';

import { type } from 'os';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class Share {
    
    @PrimaryColumn("varchar", { length: 40, nullable: false })
    id: string;

    @Column("varchar", { length: 40, nullable: false })
    ownerId: string;
    
    @Column("varchar", { length: 40, nullable: false })
    petId: string;

    @Column("timestamp", {nullable: false})
    created: Date;

    constructor() {
        this.id = '';
        this.ownerId = '';
        this.petId = '';
        this.created = new Date();
    }
}