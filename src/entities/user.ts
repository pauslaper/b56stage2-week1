import { socialConnection } from "./social-connection";

export interface UserEntity {
  id: number;
  fullName: string;
  email: string;
  image: string;
  bio?: string;
  passwordUsers: string;
  username: string;
  socialConnection: socialConnection | null;
  role: string;
  followeds: number;
  followers: number; 
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResultEntity {
  id: number;
  fullName: string;
  username: string;
  image: string;
  bio: string;
}
