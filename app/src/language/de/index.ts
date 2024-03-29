import type {
  IHeader,
  ISettings,
  IWelcome,
  INewPet,
  ICard,
  IErrors,
  INotifications,
  IDialogs,
  ICommon,
  ISharePetDetails,
  IScanResult,
  IPetDetails,
  IFilters,
} from "../index";

import {FilterTypes} from "../../enums/filters";
import {PetTypes} from "../../dto/pets";
import {ViewComponents, SubViewComponents} from "../../enums/navigation";

import {
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
} from "../../enums/layout";

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
    [SubViewComponents.newScanResult]: {
      title: "Scan Details",
      description: "",
    },
  },
  [ViewComponents.petDetails]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    },
    [SubViewComponents.petDetailsEdit]: {
      title: "",
      description: "",
    },
    [SubViewComponents.newPetScan]: {
      title: "",
      description: "",
    },
    [SubViewComponents.newScanResult]: {
      title: "",
      description: "",
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
      description: "",
    },
  },
};

const welcome: IWelcome = {
  [SubViewComponents.welcomeNoPets]: {
    addPetBar: {
      description: "Füge jetzt ein Haustier zur Wallet hinzu.",
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

const termsAndConditions = {
  generalPart1:
    "DIESE APP BIETET KEINE MEDIZINISCHEN RATSCHLÄGE UND IST NUR FÜR UNTERHALTUNGSZWECKE. DER APP ANBIETER IST NICHT HAFTBAR FÜR DIE VERWENDUNG. ALLE INHALTE UND ANDEREN IN DER APP DARGESTELLTEN INFORMATIONEN SIND NICHT ZUR BESTIMMUNG, DIAGNOSE, BEHANDLUNGEN ODER VERHINDERUNGEN VON MEDIZINISCHEN PROBLEMEN GEEIGNET. DER INHALT IST NUR ZU INFORMATIONSZWECKEN. DIE IN DIESER APP BEREITGESTELLTEN INHALTE SIND KEIN ERSATZ FÜR DIE BERATUNGS-, DIAGNOSE- ODER BEHANDLUNGSQUALIFIZIERTEN SPEZIALISTEN. SIE SOLLTEN DIE NUTZUNG DER APP ODER DES INHALTS NICHT ALS EMPFEHLUNG SEHEN. HALTEN SIE SOMIT IMMER RÜCKSPRACHE MIT IHREM BETREUENDEN TIER-SPEZIALISTEN BZW. TIERARZT. ES WIRD EMPFOHLEN PROFESSIONELLE RATSCHLÄGE EINZUHOLEN. SIE AKZEPTIEREN ALLE MÖGLICHEN RISIKEN, DIE MIT DER NUTZUNG DER APP VERBUNDEN IST. SIE BESTÄTIGEN UND STIMMEN ZU, DASS DIE GESPEICHERTEN ANGABE LEDIGLICH UNTERHALTUNGSCHARAKTER HABEN UND ES SICH HIERBEI UM EIN EXPERIMENTELLEN ANSATZ HANDELT. RISIKEN, VORTEILE UND DER UMFANG DER WIRKSAMKEIT, FALLS VORHANDEN, NICHT VOLLSTÄNDIG BEKANNT SIND. SIE ERKLÄREN SICH DAMIT EINVERSTANDEN, DIE VOLLE VERANTWORTUNG FÜR ALLE MIT DER NUTZUNG DIESER APP UND DER INHALTE VERBUNDENEN RISIKEN ZU ÜBERNEHMEN.",
  generalPart2:
    "SIE AKZEPTIEREN ALLE MÖGLICHEN RISIKEN, DIE MIT DER NUTZUNG DER APP VERBUNDEN SIND. SIE BESTÄTIGEN UND STIMMEN ZU, DASS DIE GESAMMELTEN TIERDATEN VON IHNEN FREIWILLIG BEREITGESTELLT WURDEN. DIESE APP HAT EINEN EXPERIMENTELLEN CHARACTER. SIE STIMMEN ZU DIE VOLLE VERANTWORTUNG FÜR DIE NUTZUNG DIESER APP ZU ÜBERNEHMEN.",
};

const newPet: INewPet = {
  [SubViewComponents.newPetInformation]: {
    name: "Name",
    animalType: "Tierart",
    dateOfBirth: "Geburtstag",
    primaryButton: "Speichern",
    secondaryButton: "Abbrechen",
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Speichern",
    secondaryButton: "Überspringen",
    attachmentLabel: "Scan Resultat",
  },
};

const scanResult: IScanResult = {
  newEntity: "Leerer Eintrag",
  scanResultEmpty:
    "Es konnten keine Informationen extrahiert werden, eine händische Eingabe ist erforderlich.",
  scanResultInfo:
    "Bitte überprüfe die Einträge, korrigiere und bestätige diese durch markieren der Checkbox.",
  primaryButton: "Speichern",
  secondaryButton: "Abbrechen",
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
  [ErrorTypes.deviceIsOffline]: {
    title: "Keine Internetverbindung",
    text:
      "Das Gerät ist derzeit nicht mit dem Internet Verbunden. Die App kann nur eingeschränkt verwendet werden.",
  },
  [ErrorTypes.sharePet]: {
    title: "Teilen nicht möglich",
    text:
      "Es ist ein unerwarteter Fehler aufgetreten. Die Funktion kann derzeit nur eingeschränkt verwendet werden.",
  },
  [ErrorTypes.internetConnectionRequired]: {
    title: "Internetverbindung erforderlich",
    text: "Um fortzufahren wird eine Internetverbindung benötigt.",
  },
  [ErrorTypes.unexpected]: {
    title: "Unerwarteter Fehler",
    text: "Ein unerwarteter Fehler ist aufgetreten.",
  },
  [ErrorTypes.noData]: {
    title: "Keine Daten vorhanden",
    text: "Leider können keine Daten gefunden werden.",
  },
  [ErrorTypes.scanResultEmpty]: {
    title: "Scan Ergebnis ist leer",
    text: "Es konnten leider keine Informationen extrahiert werden.",
  },
};

const notifications: INotifications = {
  [NotificationTypes.termsAndConditions]: {
    title: "Änderung der Nutzerbestimmungen",
    text:
      "Die aktuellen Nutzerbestimmung können gerne jederzeit eingesehen und aktzeptiert werden.",
  },
  [NotificationTypes.savedData]: {
    title: "Daten gespeichert",
    text: "Die Daten wurden erfolgreich gespeichert.",
  },
  [NotificationTypes.newPetCreated]: {
    title: "Neues Haustier angelegt",
    text: "Ein neues Haustier wurde erfolgreich angelegt",
  },
};

const dialogs: IDialogs = {
  [DialogContentTypes.deleteData]: {
    title: "Daten löschen",
    text:
      "Achtung die gespeicherten Daten werden durch die Zustimmung entfernt und können nicht wiederhergestellt werden.",
  },
  [DialogContentTypes.deletePet]: {
    title: "Tier löschen",
    text:
      "Achtung die gespeicherten Daten des Tieres werden durch die Zustimmung entfernt und können nicht wiederhergestellt werden.",
  },
  [DialogContentTypes.deleteAttachment]: {
    title: "Eintrag löschen",
    text: "Um den Eintrag zu löschen bitte mit Weiter bestätigen.",
  },
  [DialogContentTypes.cancelNewPet]: {
    title: "Tiereintrag verwerfen",
    text: "Möchtest du den neu erstellten Eintrag verwerfen?",
  },
  [DialogContentTypes.cancelAttachmentChanges]: {
    title: "Änderungen verwerfen",
    text: "Möchtest du die Änderungen verwerfen?",
  },
  [DialogContentTypes.cancelEditPetDetails]: {
    title: "Änderungen verwerfen",
    text: "Möchtest du die Änderungen verwerfen?",
  },
  [DialogContentTypes.skip]: {
    title: "Aktion überspringen",
    text: "Möchtest du die Aktion überspringen",
  },
  [DialogContentTypes.noDataSelected]: {
    title: "Keine Einträge ausgewählt",
    text:
      "Es wurden keine Einträge ausgewählt. Möchtest du trotzdem fortsetzen?",
  },
};

const sharePetDetails: ISharePetDetails = {
  message: "Pet Wallet möchte gern Tierdaten teilen: ",
};

const filters: IFilters = {
  [ViewComponents.petDetails]: {
    [SubViewComponents.none]: {
      [FilterTypes.generalOnly]: "Allgemein",
      [FilterTypes.medicalOnly]: "Schutzimpfungen",
    },
    [SubViewComponents.petDetailsEdit]: {
      [FilterTypes.generalOnly]: "Allgemein",
      [FilterTypes.medicalOnly]: "Schutzimpfpass",
    },
  },
};

const animalTypes = {
  [PetTypes.alpaca]: "Alpaka",
  [PetTypes.bird]: "Vogel",
  [PetTypes.burro]: "Esel",
  [PetTypes.cat]: "Katze",
  [PetTypes.chinchilla]: "Chinchilla",
  [PetTypes.cow]: "Kuh",
  [PetTypes.dog]: "Hund",
  [PetTypes.ferret]: "Frettchen",
  [PetTypes.fish]: "Fisch",
  [PetTypes.goat]: "Ziege",
  [PetTypes.hamster]: "Hamster",
  [PetTypes.hedgehog]: "Igel",
  [PetTypes.horse]: "Pferd",
  [PetTypes.llama]: "Llama",
  [PetTypes.mice]: "Maus",
  [PetTypes.other]: "Nicht gelistet",
  [PetTypes.pig]: "Schwein",
  [PetTypes.rat]: "Ratte",
  [PetTypes.snake]: "Schlange",
  [PetTypes.squirrel]: "Squirrel",
  [PetTypes.turtle]: "Schildkröte",
};

const petDetails: IPetDetails = {
  [SubViewComponents.none]: {
    noDataTitle: "Keine Daten vorhanden",
    notesTitle: "Notizen",
    noMedicineDescription:
      "Es existieren leider keine weiteren Informationen zu diesem Eintrag.",
    noVaccinationData: "Keine Impfdaten vorhanden",
  },
  [SubViewComponents.petDetailsEdit]: {
    generalInformationTitle: "Allgemeine Information",
    medicalTitle: "Medizinische Information",
    notesTitle: "Notizen",
    noVaccinationData: "Keine Impfdaten vorhanden",
  },
};

const common: ICommon = {
  newEntry: "Neuer Eintrag",
  noScansFound: "Keine Einträge hinzugefügt",
  continue: "Weiter",
  cancel: "Abbrechen",
  pick: "Auswählen",
  pleaseSelect: "Bitte auswählen",
  camera: "Kamera",
  photoLibrary: "Photoalbum",
  share: "Teilen", 
  edit: "Bearbeiten",
  scan: "Scannen",
  remove: "Löschen",
};

export const DE = {
  card,
  common,
  dialogs,
  errors,
  header,
  sharePetDetails,
  notifications,
  animalTypes,
  scanResult,
  filters,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
  [ViewComponents.newPet]: newPet,
  [ViewComponents.termsAndConditions]: termsAndConditions,
  [ViewComponents.petDetails]: petDetails,
};
