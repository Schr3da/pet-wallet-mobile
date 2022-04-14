import process from "process";

import { createConnection, Connection, Db } from "typeorm";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './entity/user';
import { Share } from './entity/share';
import { Pet } from './entity/pet';
import { Note } from './entity/note';
import { Medicine } from './entity/medicine';
import { MedicineInfo } from './entity/medicineInfo';
import { PetWalletEntry, PetWalletScan } from './entity/wallet';
import { UserRepository } from './repository/UserRepository';
import { NoteRepository } from './repository/NoteRepository';
import { PetRepository } from './repository/PetRepository';
import { PetWalletRepository } from './repository/PetWalletRepository';
import { PetWalletScanRepository } from './repository/PetWalletScanRepository';
import { MedicineRepository } from './repository/MedicineRepository';
import { ShareRepository } from './repository/ShareRepository';
import { NewsletterRegistrationRepository } from './repository/NewsletterRegistrationRepository';
import { Wallet } from "petpass-endpoints";
import { NewsletterRegistration } from "./entity/newsletterRegistration";

export class DBManager {
  static connection: Connection | null = null;
  static userRepository: UserRepository | null = null;
  static petRepository: PetRepository | null = null;
  static noteRepository: NoteRepository | null = null;
  static shareRepository: ShareRepository | null = null;
  static petWalletRepository: PetWalletRepository | null = null;
  static petWalletScanRepository: PetWalletScanRepository | null = null;
  static medicineRepository: MedicineRepository | null = null;
  static newsletterRegistrationRepository: NewsletterRegistrationRepository | null = null;

  typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "petwallet",
    password: process.env.DB_PASSWORD || "Start123456$",
    database: process.env.DB_NAME || "petwallet",
    synchronize: true,
    logging: false,
    entities: [
      User,
      Pet,
      Share,
      Note,
      PetWalletEntry,
      PetWalletScan,
      MedicineInfo,
      Medicine,
      NewsletterRegistration
    ]
  };

  initDbConnection = async () => {
    if (DBManager.connection != null) {
      console.log("database already initalized");
      return;
    }

    console.log('init db with properties ' + JSON.stringify(this.typeOrmConfig));

    DBManager.connection = await createConnection(this.typeOrmConfig);
    DBManager.userRepository = new UserRepository(DBManager.connection.getRepository(User));
    DBManager.petRepository = new PetRepository(DBManager.connection.getRepository(Pet));
    DBManager.shareRepository = new ShareRepository(DBManager.connection.getRepository(Share));
    DBManager.noteRepository = new NoteRepository(DBManager.connection.getRepository(Note));
    DBManager.petWalletRepository = new PetWalletRepository(DBManager.connection.getRepository(PetWalletEntry));
    DBManager.petWalletScanRepository = new PetWalletScanRepository(DBManager.connection.getRepository(PetWalletScan));
    DBManager.medicineRepository = new MedicineRepository(DBManager.connection.getRepository(Medicine));
    DBManager.newsletterRegistrationRepository = new NewsletterRegistrationRepository(DBManager.connection.getRepository(NewsletterRegistration));
    await DBManager.connection.synchronize();
  }
}