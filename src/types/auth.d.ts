export type AuthFormState = {
  status?: string;
  errors?: {
    email?: string[];
    password?: string[];
    first_name?: string[];
    last_name?: string[];
    role?: string[];
    address?: string[];
    _form?: string[];
  };
};

export type Profile = {
  id?: string;
  name?: string;
  avatar_url?: string;
  role?: string;
};
