type user = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  surname: string;
  role: "administrator" | "support" | "user";
};
export default user;
