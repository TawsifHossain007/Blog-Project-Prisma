import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwtAccessSecret,
    config.jwtAccessExpiration as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwtRefreshSecret,
    config.jwtRefreshExpiration as SignOptions,
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
    const verifiedToken = jwtUtils.verifyToken(refreshToken, config.jwtRefreshSecret);

     if(!verifiedToken.success){
        throw new Error(verifiedToken.error)
    }

    const {id} =  verifiedToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where : {
            id
        }
    })

    if(user.activeStatus === "BLOCKED"){
        throw new Error("User is blocked!")
    }

    const jwtPayload = {
        id,
        name : user.name,
        email : user.email,
        role : user.role
    }


    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwtAccessSecret,
        config.jwtAccessExpiration as SignOptions
    );

    return {accessToken}
}

export const authService = {
  loginUser,
  refreshToken
};