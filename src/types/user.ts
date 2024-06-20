import { post } from "./post";

export type user = {
  email: string;
  name: string;
  id: number;
  posts: post[];
};
