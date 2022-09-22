export interface User {
  username: string;
  password: string;
}

export interface DecryptedToken {
  username: string;
  role: string;
  iat: number;
  exp: number;
}
