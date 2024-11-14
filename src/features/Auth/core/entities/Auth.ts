export enum AuthProvider {
  LOCAL = 'local',
  GITHUB = 'github',
  GOOGLE = 'google',
}

export interface Auth {
  id: string;
  userId: string;
  provider: AuthProvider;
  providerId?: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}
