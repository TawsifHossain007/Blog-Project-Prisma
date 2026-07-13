import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const loginUser = async(payload : ILoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: email,
        },
    });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error("Invalid credentials");
    }

    return user;
}

export const authService = {
    loginUser
}