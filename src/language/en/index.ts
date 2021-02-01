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
} from "../index";

import {
  SubViewComponents,
  ViewComponents,
} from "../../store/actions/navigation";
import {
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
} from "../../store/actions/layout";

const header: IHeader = {
  [ViewComponents.splash]: {
    [SubViewComponents.none]: {
      title: "",
      description: "",
    },
  },
  [ViewComponents.welcome]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Welcome",
      description: "Please register a new pet in order to continue.",
    },
    [SubViewComponents.welcomeWithPets]: {
      title: "Pet Wallet",
      description: "",
    },
  },
  [ViewComponents.newPet]: {
    [SubViewComponents.newPetInformation]: {
      title: "New Pet",
      description:
        "Enter some information of your pet and continue by pressing next.",
    },
    [SubViewComponents.newPetScan]: {
      title: "Digital Pass",
      description:
        "Take photos of your pets pass and we convert it in a digital form",
    },
    [SubViewComponents.newAttachment]: {
      title: "Attachment Details",
      description:
        "Please find the scan result of the provided image. It is possible to correct defects below.",
    },
  },
  [ViewComponents.settings]: {
    [SubViewComponents.none]: {
      title: "Settings",
      description: "You can modify and review your app settings here.",
    },
  },
  [ViewComponents.help]: {
    [SubViewComponents.welcomeNoPets]: {
      title: "Help",
      description: "",
    },
  },
  [ViewComponents.termsAndConditions]: {
    [SubViewComponents.none]: {
      title: "Terms and conditions",
      description: "You can review the terms and condition of the app here.",
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
      description: "Start adding a new pet to your wallet.",
      button: "Add",
    },
    help: {
      button: "Do you need help?",
    },
  },
  [SubViewComponents.welcomeWithPets]: {
    addPetBar: {
      description: "You can add additional pets to your personal wallet.",
      button: "Add",
    },
  },
};

const settings: ISettings = {
  [SubViewComponents.none]: {
    language: "Select language:",
    theme: "Select theme:",
    agbs: {
      description: "The terms and conditions are accessable from here.",
      button: "Show conditions",
    },
    accountDeletion: {
      description: "If you want you can delete all saved data anytime.",
      button: "Request deletion",
    },
  },
};

const card: ICard = {
  nameProperty: "Name",
  animalProperty: "Animal",
};

const newPet: INewPet = {
  [SubViewComponents.newPetInformation]: {
    primaryButton: "Continue",
    secondaryButton: "Cancel",
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Finish",
    secondaryButton: "Cancel",
    attachmentLabel: "Attachment",
  },
  [SubViewComponents.newAttachment]: {
    primaryButton: "Übernehmen",
    secondaryButton: "Abbrechen",
  },
};

const errors: IErrors = {
  default: {
    title: "Error",
    text: "An error has occurred",
  },
  [ErrorTypes.inputField]: {
    title: "Missing information",
    text: "Please ensure all required inputs fields are filled out.",
  },
  [ErrorTypes.camera]: {
    title: "Access denied",
    text:
      "Photos can not be accessed. Please check your app permissions and enable photo access.",
  },
  [ErrorTypes.photoLibrary]: {
    title: "Access denied",
    text:
      "Photos can not be accessed. Please check your app permissions and enable photo access.",
  },
};

const notifications: INotifications = {
  [NotificationTypes.termsAndConditions]: {
    title: "Terms and conditions",
    text:
      "We have updated our terms and condtions. They can be reviewed and accepted at any time.",
  },
  [NotificationTypes.savedData]: {
    title: "Data saved",
    text: "The data has been saved successfully.",
  },
};

const dialogs: IDialogs = {
  [DialogContentTypes.deleteData]: {
    title: "Data deletion",
    text:
      "Attention this is an unreversable action which will remove all saved data associated with your pet wallet.",
  },
  [DialogContentTypes.deleteAttachment]: {
    title: "Delete Attachment",
    text: "Please continue to delete the information.",
  },
  [DialogContentTypes.cancelNewPet]: {
    title: "Cancel new pet",
    text: "Press continue to cancel the new pet entry.",
  },
  [DialogContentTypes.cancelAttachmentChanges]: {
    title: "Discard changes",
    text: "Press continue to discard the modifications.",
  },
};

const common: ICommon = {
  continue: "Continue",
  cancel: "Cancel",
};

export const EN = {
  card,
  common,
  dialogs,
  errors,
  header,
  notifications,
  [ViewComponents.welcome]: welcome,
  [ViewComponents.settings]: settings,
  [ViewComponents.newPet]: newPet,
};
