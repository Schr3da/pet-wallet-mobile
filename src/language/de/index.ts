import {SubViewComponents, ViewComponents} from "../../store/actions/layout";

import type {IHeader, IWelcome} from "../index";

const header: IHeader = {
  [ViewComponents.splash]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    }
  },
  [ViewComponents.welcome]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Willkommen",
      description: "Bitte registriere zunächst dein Haustier um fortzufahren",
    },
    [SubViewComponents.welcomeWithPets]: {
      title: "Pet Wallet",
      description: "",
    }
  },
  [ViewComponents.newPet]: {
    [SubViewComponents.newPetType]: {
      title: "Neues Haustier",
      description: "Wähle dein Haustier und bestätige deine Auswahl mit Weiter",
    }
  },
  [ViewComponents.help]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Hilfe",
      description: "",
    }
  },
}

const welcome: IWelcome = {
  [SubViewComponents.welcomeNoPets]: {
    addPetBar: {
      description: "Füge ein Haustier zu deiner persönlichen Pet Wallet hinzu.",
      button: "Hinzufügen",
    },
    help: {
      button: "Brauchst du Hilfe?"
    }
  },
  [SubViewComponents.welcomeWithPets]: {
    addPetBar: {
      description: "Füge ein weiteres Haustier zu deiner persönlichen Pet Wallet jederzeit hinzu.", 
      button: "Hinzufügen",
    },
  }
}

export const DE = {
  header,
  [ViewComponents.welcome]: welcome,
}
