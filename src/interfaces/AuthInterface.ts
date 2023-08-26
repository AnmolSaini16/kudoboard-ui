export interface SingInInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  boardIds: string[];
  email: string;
  isCreator: boolean;
  isLoggedIn: boolean;
  name: string;
  password: string;
  _id: string;
}
