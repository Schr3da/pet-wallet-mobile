export enum DialogContentTypes {
  deleteData = "deleteData",
  deleteAttachment = "deleteAttachment",
  cancelAttachmentChanges = "cancelAttachmentChanges",
  cancelNewPet = "cancelNewPet",
  cancelEditPetDetails = "cancelEditPetDetails",
}

export enum ErrorTypes {
  inputField = "inputFieldError",
  camera = "cameraError",
  photoLibrary = "photoLibraryError",
  deviceIsOffline = "deviceIsOfflineError",
  internetConnectionRequired = "internetConnectionRequiredError",
  sharePet = "sharePetError",
  unexpected = "unexpectedError",
  scanResultEmpty = "scanResultEmptyError",
}

export enum NotificationTypes {
  termsAndConditions = "termsAndConditions",
  savedData = "savedData",
  newPetCreated = "newPetCreated",
}

export enum DisplayModes {
  portrait = "portrait",
  landscape = "landscape",
}

export enum DatePickerModes {
  datetime = "datetime",
  date = "date",
  time = "time",
}

export enum InputTypes {
  text,
  date,
  picker,
  camera,
}
