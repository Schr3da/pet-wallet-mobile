
import {
    Column,
    Index,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryColumn
} from 'typeorm';

import { Medicine } from './medicine';

@Entity()
export class MedicineInfo {

    @PrimaryColumn("varchar", { length: 40 })
    id: string;

    @Index()
    @ManyToOne(() => Medicine, medicine => medicine.id)
    @JoinColumn({ name: 'medicineId' })
    medicine: Medicine | null;

    @Column("varchar", { length: 2 })
    language: string;

    @Column("varchar")
    shortDescription: string;

    @Column("varchar")
    longDescription: string;

    @Column("varchar")
    url: string;

    constructor() {
        this.id = '';
        this.medicine = null;
        this.language = '';
        this.shortDescription = '';
        this.longDescription = '';
        this.url = '';
    }
}