import Users from "@/models/Users.model";

export const getUserEmail = async (email: string) => {
  const existEmail = await Users.findOne({
    where: { email },
  });

  return existEmail;
};
