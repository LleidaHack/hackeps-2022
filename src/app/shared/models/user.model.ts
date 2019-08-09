export interface UserModel {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  fullName?: string;
  nickName?: string;
  birthDate?: Date;
  githubUrl?: string;
  linkedInUrl?: string;
}
