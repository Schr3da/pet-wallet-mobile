
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

import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { CreateWalletScanResponse, PetWalletScanResponseResultSuggestion, PetWalletScanMedicineInfo} from '../../api/wallet';

@Entity()
export class PetWalletEntry {

    @PrimaryColumn("varchar", { length: 40, nullable: false })
    id: string;

    @Column("varchar", { length: 40, nullable: true })
    medicineId: string | null;

    @Column("varchar", { length: 40, nullable: false })
    @Index()
    petId: string;

    @Column("varchar", { length: 100, nullable: false })
    title: string;

    @Column("varchar", { length: 2048, nullable: true })
    description: string | null;

    @Column("timestamp", { nullable: false })
    date: Date;

    constructor() {
        this.id = '';
        this.petId = '';
        this.medicineId = null;
        this.title = '';
        this.description = null;
        this.date = new Date();
    }
}

@Entity()
export class PetWalletScan {

    @PrimaryColumn("varchar", { length: 40 })
    id: string;

    @Column("varchar", { length: 40, nullable: false })
    petId: string;

    @Column("varchar", {nullable: false})
    image: string;

    @Column("timestamp", {nullable: false})
    created: Date;

    @Column("timestamp", { nullable: true })
    processed: Date | null;

    @Column("varchar", { nullable: true })
    ocrTokensRawSerialized: string;

    @Column("decimal", { nullable: false })
    ocrImageRotation: number | null;

    ocrTokensRaw: string[];

    constructor() {
        this.id = '';
        this.petId = '';
        this.image = '';
        this.created = new Date();
        this.processed = null;
        this.ocrTokensRawSerialized = '';
        this.ocrImageRotation = 0.0;
        this.ocrTokensRaw = [];
    }

    @BeforeInsert()
    @BeforeUpdate()
    public serializeKnownTokens(): void {
        this.ocrTokensRawSerialized = this.ocrTokensRaw.join(" ");
    }

    @AfterLoad()
    public deserializKnownTokensRaw() : void {
        this.ocrTokensRaw = this.ocrTokensRawSerialized.split(" ");
    }
}