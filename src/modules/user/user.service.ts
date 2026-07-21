import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserinDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcryptSaltRounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto: profilePhoto || null,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const updateMyProfileInDB = async (userId: string, payload: any) => {
  const { name, email, profilePhoto, bio } = payload;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { 
      name, 
      email,
      profile: {
        update: {
          profilePhoto,
          bio
        }
      }
    }, 
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return updatedUser;
};

export const userService = {
  registerUserIntoDB: registerUserinDB,
  getMyProfileFromDB: getMyProfileFromDB,
  updateMyProfileInDB: updateMyProfileInDB,
};
