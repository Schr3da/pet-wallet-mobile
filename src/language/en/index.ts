import type {IWelcome} from "../index";

const welcome: IWelcome = {
  noPets: {
    title: "Welcome",
    description: "Please register a new pet in order to continue", 
  },
  somePets: {
    title: "Pet Wallet",
    description: "",
  },
  addPetBar: {
    description: "You can add additional pets to your personal wallet", 
    button: "Add",
  },
  help: {
    button: "Do you need help?"
  }
}

export const EN = {
  welcome,
}
