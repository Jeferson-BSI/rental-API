interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin?: boolean;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
