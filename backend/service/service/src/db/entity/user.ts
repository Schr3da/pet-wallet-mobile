  
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';

import { type } from 'os';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class User {
    
    @PrimaryColumn("varchar", { length: 40, nullable: false })
    id: string;

    @Column("varchar", { length: 20, nullable: false })
    nickname: string;

    @Column("varchar", { length: 100, nullable: false })
    token: string;

    @Column("timestamp", {nullable: false})
    created: Date;

    constructor() {
        this.id = '';
        this.nickname = '';
        this.token = '';
        this.created = new Date();
    }
}