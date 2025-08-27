export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_LOGIN_FORM = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    _form: [],
  },
  redirectTo: "/",
};

export const INITIAL_STATE_PROFILE = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  role: undefined as any,
  gender: undefined as any, // Will be filled when user selects
  subVillage: undefined as any,
};

export const INITIAL_CREATE_USER_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  role: undefined as any,
  gender: undefined as any, // Will be filled when user selects
  subVillage: undefined as any,
};

export const INITIAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    first_name: [],
    last_name: [],
    phone_number: [],
    address: [],
    role: [],
    subVillage: [],
    gender: [],

    _form: [],
  },
};
