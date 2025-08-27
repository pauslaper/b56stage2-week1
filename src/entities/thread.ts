import { UserEntity } from "./user";

export interface ThreadEntity {
  id: number;
  content: string;
  image?: string;
  userId: number;

  user: UserEntity;

  createdAt: Date;
  updatedAt: Date;

  replies?: ReplyEntity[];

  likes?: likeEntity[];
}

export interface ReplyEntity {
  id: number;
  content: string;
  image?: string | null;
  likes?: likeEntity[];
  user: UserEntity;
  threadId: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface likeEntity {
  id: number;
  threadId: number;
  replyId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
