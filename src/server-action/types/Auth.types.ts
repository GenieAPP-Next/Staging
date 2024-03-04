interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export type { RegisterInput, LoginInput };
