export enum DialogContentTypes {
  deleteData = "deleteData",
  deleteAttachment = "deleteAttachment",
  cancelAttachmentChanges = "cancelAttachmentChanges",
  cancelNewPet = "cancelNewPet",
}

export enum ErrorTypes {
  inputField = "inputFieldError",
  camera = "cameraError",
  photoLibrary = "photoLibraryError",
  deviceIsOffline = "deviceIsOffline",
  internetConnectionRequired = "internetConnectionRequired",
  sharePet = "sharePet",
  unexpected = "unexpectedError",
}

export enum NotificationTypes {
  termsAndConditions = "termsAndConditions",
  savedData = "savedData",
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
