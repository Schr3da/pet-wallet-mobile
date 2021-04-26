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

import {PetTypes} from "../../dto/pets";
import {ViewComponents, SubViewComponents} from "../../enums/navigation";
import {
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
} from "../../enums/layout";
import {FilterTypes} from "../../enums/filters";

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
    [SubViewComponents.newScanResult]: {
      title: "Scan details",
      description: "",
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
      title: "Scan details",
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

const termsAndConditions = {
  generalPart1:
    "THIS APP DOES NOT OFFER MEDICAL ADVICES AND IS FOR ENTERTAINMENT PURPOSES ONLY. THE APP PROVIDER IS NOT LIABLE FOR ANY MISUSAGE. ALL CONTENT AND ANY OTHER INFORMATION PRESENTED IN THE APP IS NOT INTENDED TO REPRESENT DIAGNOSES, CURES, TREATS, OR PREVENTION OF ANY MEDICAL PROBLEMS. THE CONTENT IS FOR INFORMATIONAL PURPOSES ONLY.THE CONTENT PROVIDED IN THIS APP IS NOT A SUBSTITUTE FOR THE ADVICE, DIAGNOSIS, OR TREATMENT QUALIFIED HEALTH CARE PROFESSIONAL. YOU SHOULD NOT CONSIDER USE OF THE APP OR CONTENT A RECOMMENDATION THAT YOU STOP SEEING ANY OF QUALIFIED HEALTH CARE PROFESSIONALS OR USING PRESCRIBED MEDICATION, IF ANY, WITHOUT CONSULTING WITH A HEALTH CARE PROFESSIONAL. IT IS STRONGLY ADVISED THAT YOU SEEK PROFESSIONAL ADVICE AS YOU DEEM APPROPRIATE.",
  generalPart2:
    "YOU ACCEPT ALL POTENTIAL RISKS ASSOCIATED WITH USE OF THIS APP. YOU ACKNOWLEDGE AND AGREE THAT YOU PROVIDED YOUR PET INFORMATION VOLUNTARY. THIS IS AN EXPERIMENTAL APPROACH SO RISKS, BENEFITS, AND THE EXTENT OF ITS EFFECTIVENESS, IF ANY, ARE NOT FULLY KNOWN. YOU THEREFORE AGREE TO ASSUME AND ACCEPT FULL RESPONSIBILITY FOR ANY AND ALL RISKS ASSOCIATED WITH USING THIS APP AND THE CONTENT.",
};

const card: ICard = {
  nameProperty: "Name",
  animalProperty: "Animal",
};

const newPet: INewPet = {
  [SubViewComponents.newPetInformation]: {
    name: "Name",
    animalType: "Animal type",
    dateOfBirth: "Date of birth",
    primaryButton: "Save",
    secondaryButton: "Cancel",
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: "Save",
    secondaryButton: "Skip",
    attachmentLabel: "Scan result",
  },
};

const scanResult: IScanResult = {
  newEntity: "Empty entry",
  scanResultEmpty:
    "No informaiton could be extracted from the scan, you might need to enter them manually.",
  scanResultInfo:
    "Please review, modify or select matched results using the checkbox.",
  primaryButton: "Save",
  secondaryButton: "Cancel",
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
  [ErrorTypes.deviceIsOffline]: {
    title: "No network connection",
    text:
      "The Device is currently not connected to the internet. As a result the app is working limited.",
  },
  [ErrorTypes.sharePet]: {
    title: "Content sharing not possible",
    text:
      "An error has occured. Currently the share function does not work properly. Please try again.",
  },
  [ErrorTypes.internetConnectionRequired]: {
    title: "Network connection required",
    text: "In order to continue a network connection is required.",
  },
  [ErrorTypes.unexpected]: {
    title: "Unexpected Error",
    text: "An unexpected error has occurred",
  },
  [ErrorTypes.noData]: {
    title: "No data available",
    text: "Unfortunately no data could be found.",
  },
  [ErrorTypes.scanResultEmpty]: {
    title: "Scan result is empty",
    text: "Unfortunately no information could be extracted from the scan.",
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
  [NotificationTypes.newPetCreated]: {
    title: "New pet created",
    text: "A new pet has been successfully created.",
  },
};

const dialogs: IDialogs = {
  [DialogContentTypes.deleteData]: {
    title: "Data deletion",
    text:
      "Attention this is an unreversable action which will remove all saved data associated with your pet wallet.",
  },
  [DialogContentTypes.deletePet]: {
    title: "Delete pet",
    text:
      "Attention this is an unreversable action which will remove the pet and its saved data from your pet wallet.",
  },
  [DialogContentTypes.deleteAttachment]: {
    title: "Delete data entry",
    text: "Please press continue to delete the information.",
  },
  [DialogContentTypes.cancelNewPet]: {
    title: "Cancel new pet",
    text: "Press continue to cancel the new pet entry.",
  },
  [DialogContentTypes.cancelAttachmentChanges]: {
    title: "Discard changes",
    text: "Press continue to discard the modifications.",
  },
  [DialogContentTypes.cancelEditPetDetails]: {
    title: "Discard changes",
    text: "Do you want to discard your changes?",
  },
  [DialogContentTypes.skip]: {
    title: "Skip action",
    text: "Do you want to skip this step?",
  },
  [DialogContentTypes.noDataSelected]: {
    title: "No data selected",
    text: "No data have been selected. Do you want to continue?",
  },
};

const sharePetDetails: ISharePetDetails = {
  message: "Pet Wallet want to share data: ",
};

const filters: IFilters = {
  [ViewComponents.petDetails]: {
    [SubViewComponents.none]: {
      [FilterTypes.generalOnly]: "General",
      [FilterTypes.medicalOnly]: "Vaccination",
    },
    [SubViewComponents.petDetailsEdit]: {
      [FilterTypes.generalOnly]: "General",
      [FilterTypes.medicalOnly]: "Vaccination",
    },
  },
};

const petDetails: IPetDetails = {
  [SubViewComponents.none]: {
    noDataTitle: "No data available",
    notesTitle: "Notes",
    noMedicineDescription:
      "To this entry no further information are available.",
    noVaccinationData: "No vaccination information are available",
  },
  [SubViewComponents.petDetailsEdit]: {
    generalInformationTitle: "Allgemeine Information",
    medicalTitle: "Medizinische Information",
    notesTitle: "Notes",
    noVaccinationData: "No vaccination information are available",
  },
};

const animalTypes = {
  [PetTypes.alpaca]: "Alpaca",
  [PetTypes.bird]: "Bird",
  [PetTypes.burro]: "Burro",
  [PetTypes.cat]: "Cat",
  [PetTypes.chinchilla]: "Chinchilla",
  [PetTypes.cow]: "Cow",
  [PetTypes.dog]: "Dog",
  [PetTypes.ferret]: "Ferret",
  [PetTypes.fish]: "Fish",
  [PetTypes.goat]: "Goat",
  [PetTypes.hamster]: "Hamster",
  [PetTypes.hedgehog]: "Hedgehog",
  [PetTypes.horse]: "Horse",
  [PetTypes.llama]: "Llama",
  [PetTypes.mice]: "Mice",
  [PetTypes.other]: "Other",
  [PetTypes.pig]: "Pig",
  [PetTypes.rat]: "Rat",
  [PetTypes.snake]: "Snake",
  [PetTypes.squirrel]: "Squirrel",
  [PetTypes.turtle]: "Turtle",
};

const common: ICommon = {
  newEntry: "New entry",
  noScansFound: "No scans added",
  continue: "Continue",
  cancel: "Cancel",
  pick: "Select",
  pleaseSelect: "Please select",
  camera: "Camera",
  photoLibrary: "Photo library",
  share: "Share", 
  edit: "Edit",
  scan: "Scan",
  remove: "Delete",
};

export const EN = {
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
