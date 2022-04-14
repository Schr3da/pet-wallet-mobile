
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    JoinTable,
    Index
} from 'typeorm';

import { MedicineInfo } from './medicineInfo';

@Entity()
export class Medicine {

    @PrimaryColumn("varchar", { length: 40 })
    id: string;

    @Index()
    @Column("varchar", { length: 30 })
    searchTerm: string;

    @OneToMany(() => MedicineInfo, info => info.medicine)
    infos: MedicineInfo[] | null;

    constructor() {
        this.id = '';
        this.searchTerm = '';
        this.infos = null;
    }
}