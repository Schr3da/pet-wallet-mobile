import type {INewPet, IWelcome} from "../index";

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

const newPet: INewPet = {
  petSelection: {
    title: "New Pet",
    description: "Choose your pet and continue with next",
  }
}

export const EN = {
  welcome,
  newPet,
}
