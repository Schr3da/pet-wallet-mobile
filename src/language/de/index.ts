import type {IWelcome} from "../index";

const welcome: IWelcome = {
  noPets: {
    title: "Willkommen",
    description: "Bitte registriere zunächst dein Haustier um fortzufahren",
  },
  somePets: {
    title: "Pet Wallet",
    description: "",
  },
  addPetBar: {
    description: "Füge ein Haustier zu deiner persönlichen Pet Wallet hinzu.",
    button: "Hinzufügen",
  },
  help: {
    button: "Brauchst du Hilfe?"
  }
}

export const DE = {
  welcome,
}
