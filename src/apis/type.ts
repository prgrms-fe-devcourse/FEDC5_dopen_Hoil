export interface User {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: string[] | TComment[];
  followers: [];
  following: Follow[];
  notifications: Notification[];
  messages: Message[];
  _id: string; //유저의 고유 ID
  fullName: string;
  username: string; // 유저 닉네임
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChannelRequestBody {
  authRequired: boolean;
  description: string;
  name: string;
}

export interface Post {
  likes: Like[]; //likes의 길이로 like 수 알 수 있음
  comments: TComment[];
  _id: string; //post에 대한 id
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: Channel;
  author: User; //작성자 정보
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface Like {
  _id: string; //변동되는  값
  user: string; // 좋아요를 누른 유저의 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post: string | null; // 포스트 id
  follow?: string; // 사용자 id
  comment?: TComment;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

export interface Follow {
  _id: string;
  user: string; // 사용자 id
  follower: string; // 사용자 id
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TComment {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string[];
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
}
