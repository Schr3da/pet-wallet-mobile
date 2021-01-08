import {LanguageTypes} from "../../../../../language";

import {ThemeTypes} from "../../../../../theme";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm/browser";

@Entity("settings")
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theme: ThemeTypes;

  @Column()
  language: LanguageTypes;

  constructor() { 
    this.id = 0;
    this.theme = ThemeTypes.Light;
    this.language = LanguageTypes.de;
  }
}

