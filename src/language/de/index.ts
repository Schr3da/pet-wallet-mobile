import {SubViewComponents, ViewComponents} from "../../store/actions/navigation";

import type {IHeader, ISettings, IWelcome} from "../index";

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
    [SubViewComponents.newPetType]: {
      title: "Neues Haustier",
      description: "Wähle dein Haustier und bestätige deine Auswahl mit Weiter.",
    }
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
      description: "Füge ein weiteres Haustier zu deiner persönlichen Pet Wallet jederzeit hinzu.", 
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

const addPet = {
  [SubViewComponents.newPetType]: {
    categories: {
      

    }
  }
}



export const DE = {
  header,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
};
