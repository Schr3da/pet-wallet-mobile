import type {IHeader, ISettings, IWelcome, INewPet} from "../index";

import {SubViewComponents, ViewComponents} from "../../store/actions/navigation";
import {SecondaryButton} from "../../components/common/rounded-button";

const header: IHeader = {
  [ViewComponents.splash]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    }
  },
  [ViewComponents.welcome]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Welcome",
      description: "Please register a new pet in order to continue.", 
    },
    [SubViewComponents.welcomeWithPets]: {
      title: "Pet Wallet",
      description: "",
    }
  },
  [ViewComponents.newPet]: {
    [SubViewComponents.newPetInformation]: {
      title: "New Pet",
      description: "Enter some information of your pet and continue by pressing next.",
    },
    [SubViewComponents.newPetScan]: {
      title: "Digital Pass",
      description: "Take photos of your pets pass and we convert it in a digital form",
    },
  },
  [ViewComponents.settings]: {
    [SubViewComponents.none]: {
      title: "Settings",
      description: "You can modify and review your app settings here.",
    }
  },
  [ViewComponents.help]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Help",
      description: "",
    }
  },
  [ViewComponents.termsAndConditions]: {
    [SubViewComponents.none]: {
      title: "Terms and conditions",
      description: "You can review the terms and condition of the app here.", 
    }
  }
};

const welcome: IWelcome = {
  [SubViewComponents.welcomeNoPets]: {
    addPetBar: {
      description: "You can add additional pets to your personal wallet.", 
      button: "Add",
    },
    help: {
      button: "Do you need help?"
    }
  },
  [SubViewComponents.welcomeWithPets]: {
    addPetBar: {
      description: "You can add additional pets to your personal wallet.", 
      button: "Add",
    },
  }
};

const settings: ISettings = {
  [SubViewComponents.none]: {
    language: "Select language:",
    theme: "Select theme:",
    agbs: {
      description: "The terms and conditions are accessable from here.",
      button: "Show conditions"
    },
    accountDeletion: {
      description: "If you want you can delete all saved data anytime.",
      button: "Request deletion"
    }
  },
};

const newPet: INewPet = {
  [SubViewComponents.newPetInformation]: {
    primaryButton: "Continue",
    secondaryButton: "Cancel"
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Finish",
    secondaryButton: "Cancel",
    attachmentLabel: "Attachment with label"
  }
}

export const EN = {
  header,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
  [ViewComponents.newPet]: newPet,
}
