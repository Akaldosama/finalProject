export interface IUser {
  first_name: FormDataEntryValue | null;
  last_name: FormDataEntryValue | null;
  avatar?: string | undefined;
  age: number;
  role: FormDataEntryValue | null | string;
  // image?: string | undefined;
  username:FormDataEntryValue | null;
  description:FormDataEntryValue | null;
  password:FormDataEntryValue | null;
  _id?: string | undefined;
}