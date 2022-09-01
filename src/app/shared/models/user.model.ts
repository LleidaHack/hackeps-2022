export interface UserModel {
  uid: string;
  email: string;
  city?: string;
  photoURL?: string;
  displayName?: string;
  fullName?: string;
  nickname?: string;
  birthDate?: Date;
  githubUrl?: string;
  linkedinUrl?: string;
  accepted?: string;
  gdpr?: boolean;
  //covid?: boolean;
  food?: string;
  shirtSize?: string;
  discordCode?: string;
}
