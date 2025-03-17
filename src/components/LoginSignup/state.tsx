import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    email: "",
    username: "",
    password: "",
    newPassword: "",
    errorMessage: "",
    loading: false,
    authView: "login", // Can be "login", "signup", or "forgotPassword"
  },
});
