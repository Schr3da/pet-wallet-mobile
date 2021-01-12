import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import {ThemeTypes} from "../../../../../theme";

import {LanguageTypes} from "../../../../../language";

@Entity()
export class Settings {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    theme: string = ThemeTypes.Light;

    @Column()
    language: string = LanguageTypes.en;
};
