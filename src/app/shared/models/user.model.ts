export interface UserModel {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  fullName?: string;
  nickname?: string;
  birthDate?: Date;
  githubUrl?: string;
  linkedinUrl?: string;
  accepted?: string;
}
