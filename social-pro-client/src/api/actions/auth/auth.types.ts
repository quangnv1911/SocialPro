export type LoginMutationArguments = {
  userCredential: string
  password: string
};

export type LoginMutationResponse = {
  isAuthenticated: boolean
  accessToken: string
  refreshToken: string
  role: string
  userName: string
  email: string
  image: string
};

export type GetMeQueryResponse = {
  firstName: string;
  lastName: string;
  userName: string;
};

export type User = {
  id: string;
  name: string;
};

export type GetUsersResponse = {
  users: User[];
  nextPage?: number | null;
};

export type GetUsersInfiniteArgs = {
  count?: string;
};

export type GetUsersListArgs = {
  page?: string;
};

export type RefreshTokenMutationResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterMutationArguments = {
  userName: string;
  password: string;
  email: string;
  captchaText: string;
  captchaId?: number;
}

// API_ACTION_TYPES
