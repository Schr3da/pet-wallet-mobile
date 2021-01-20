import type {IHeader, ISettings, IWelcome, INewPet, ICard} from "../index";

import {SubViewComponents, ViewComponents} from "../../store/actions/navigation";

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
      description: "Bitte registriere zunächst dein Haustier um fortzufahren.",
    },
    [SubViewComponents.welcomeWithPets]: {
      title: "Pet Wallet",
      description: "",
    }
  },
  [ViewComponents.newPet]: {
    [SubViewComponents.newPetInformation]: {
      title: "Neues Haustier",
      description: "Gib ein paar Informationen über dein Haustier ein und bestätige diese mit Weiter.",
    },
    [SubViewComponents.newPetScan]: {
      title: "Digitaler Impfpass",
      description: "Photographiere den Impfass deines Haustieres und wir digitalisieren ihn sofort.",
    },
  },
  [ViewComponents.settings]: {
    [SubViewComponents.none]: {
      title: "Einstellungen",
      description: "Hier kannst du die aktuellen App Einstellungen einsehen und verändern.", 
    }
  },
  [ViewComponents.help]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Hilfe",
      description: "",
    }
  },
  [ViewComponents.termsAndConditions]: {
    [SubViewComponents.none]: {
      title: "Nutzungsbedingungen",
      description: "Hier kannst du die Nutzungsbedingen dieser App einsehen.", 
    }
  }
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
      description: "Füge ein weiteres Haustier jederzeit hinzu.", 
      button: "Hinzufügen",
    },
  }
}

const settings: ISettings = {
  [SubViewComponents.none]: {
    language: "Sprache auswählen:",
    theme: "Farbmotiv auswählen:",
    agbs: {
      description: "Die Nutungsbedingungen können hier eingesehen werden.",
      button: "Jetzt anzeigen"
    },
    accountDeletion: {
      description: "Es ist jederzeit möglich die gespeicherten Daten zu löschen.",
      button: "Daten löschen"
    },
  },
};

const card: ICard = {
  nameProperty: "Name",
  animalProperty: "Tier",
};

const newPet: INewPet = {
  [SubViewComponents.newPetInformation]: {
    primaryButton: "Weiter",
    secondaryButton: "Abbrechen",
    scanErrorTitle: "Zurgiff verweigert",
    scanErrorMessage: "Auf das Photo kann nicht zugegriffen werden. Bitte überprüfe die Berechtigungen der App in den Einstellungen."
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Übernehmen",
    secondaryButton: "Abbrechen",
    scanErrorTitle: "Zurgiff verweigert",
    scanErrorMessage: "Auf das Photo kann nicht zugegriffen werden. Bitte überprüfe die Berechtigungen der App in den Einstellungen.",
    attachmentLabel: "Anhang"
  }
};

export const DE = {
  header,
  card,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
  [ViewComponents.newPet]: newPet,
};
