import type {INewPet, IWelcome} from "../index";

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

const newPet: INewPet = {
  petSelection: {
    title: "Neues Haustier",
    description: "Wähle dein Haustier und bestätige deine Auswahl mit Weiter",
  }
}

export const DE = {
  welcome,
  newPet,
}
