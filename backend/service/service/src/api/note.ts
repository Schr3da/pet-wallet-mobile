export interface INote {
  title: string;
  body: string;
}

export interface ICreateWalletNotesRequest {
  petId: string;
  notes: INote[];
}

export interface IGetWalletNotesRequest {
  petId: string;
}

export interface IGetWalletNotesResponse {
  data: INote[] // if data are emtpy empty array is returned
}
