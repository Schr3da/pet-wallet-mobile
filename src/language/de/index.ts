import type {
  IHeader,
  ISettings,
  IWelcome,
  INewPet,
  ICard,
  IErrors,
  INotifications,
} from "../index";

import {
  SubViewComponents,
  ViewComponents,
} from "../../store/actions/navigation";
import {ErrorTypes, NotificationTypes} from "../../store/actions/layout";

const header: IHeader = {
  [ViewComponents.splash]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    },
  },
  [ViewComponents.welcome]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Willkommen",
      description: "Bitte registriere zunächst dein Haustier um fortzufahren.",
    },
    [SubViewComponents.welcomeWithPets]: {
      title: "Pet Wallet",
      description: "",
    },
  },
  [ViewComponents.newPet]: {
    [SubViewComponents.newPetInformation]: {
      title: "Neues Haustier",
      description:
        "Gib ein paar Informationen über dein Haustier ein und bestätige diese mit Weiter.",
    },
    [SubViewComponents.newPetScan]: {
      title: "Digitaler Impfpass",
      description:
        "Photographiere den Impfass deines Haustieres und wir digitalisieren ihn sofort.",
    },
  },
  [ViewComponents.settings]: {
    [SubViewComponents.none]: {
      title: "Einstellungen",
      description:
        "Hier kannst du die aktuellen App Einstellungen einsehen und verändern.",
    },
  },
  [ViewComponents.help]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Hilfe",
      description: "",
    },
  },
  [ViewComponents.termsAndConditions]: {
    [SubViewComponents.none]: {
      title: "Nutzungsbedingungen",
      description: "Hier kannst du die Nutzungsbedingen dieser App einsehen.",
    },
  },
  [ViewComponents.petDetails]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    },
  },
};

const welcome: IWelcome = {
  [SubViewComponents.welcomeNoPets]: {
    addPetBar: {
      description: "Füge ein Haustier zu deiner persönlichen Pet Wallet hinzu.",
      button: "Hinzufügen",
    },
    help: {
      button: "Brauchst du Hilfe?",
    },
  },
  [SubViewComponents.welcomeWithPets]: {
    addPetBar: {
      description: "Füge ein weiteres Haustier jederzeit hinzu.",
      button: "Hinzufügen",
    },
  },
};

const settings: ISettings = {
  [SubViewComponents.none]: {
    language: "Sprache auswählen:",
    theme: "Farbmotiv auswählen:",
    agbs: {
      description: "Die Nutungsbedingungen können hier eingesehen werden.",
      button: "Jetzt anzeigen",
    },
    accountDeletion: {
      description:
        "Es ist jederzeit möglich die gespeicherten Daten zu löschen.",
      button: "Daten löschen",
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
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Übernehmen",
    secondaryButton: "Abbrechen",
    attachmentLabel: "Anhang",
  },
};

const errors: IErrors = {
  default: {
    title: "Fehler",
    text: "Ein Fehler ist aufgetreten",
  },
  [ErrorTypes.inputField]: {
    title: "Zurgiff verweigert",
    text:
      "Auf das Photo kann nicht zugegriffen werden. Bitte überprüfe die Berechtigungen der App in den Einstellungen.",
  },
  [ErrorTypes.camera]: {
    title: "Zurgiff verweigert",
    text:
      "Auf das Photo kann nicht zugegriffen werden. Bitte überprüfe die Berechtigungen der App in den Einstellungen.",
  },
  [ErrorTypes.photoLibrary]: {
    title: "Zurgiff verweigert",
    text:
      "Auf das Photo kann nicht zugegriffen werden. Bitte überprüfe die Berechtigungen der App in den Einstellungen.",
  },
};

const notifications: INotifications = {
  [NotificationTypes.termsAndConditions]: {
    title: "Änderung der Nutzerbestimmungen",
    text: "Die aktuellen Nutzerbestimmung können gerne jederzeit eingesehen und aktzeptiert werden."
  },
  [NotificationTypes.savedData]: {
    title: "Daten gespeichert",
    text: "Die Daten wurden erfolgreich gespeichert."
  }
};

export const DE = {
  header,
  card,
  errors,
  notifications,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
  [ViewComponents.newPet]: newPet,
};
