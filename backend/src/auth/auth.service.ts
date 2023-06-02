import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from "@prisma/client";

@Injectable({
})


// Stores the business logic
export class AuthService {
    constructor(private prisma: PrismaService) { } // Importing a GLOBAL service

    async signup(dto: AuthDto) {
        // Generate password hash
        const hash = await argon.hash(dto.password);

        // Save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passHash: hash,
                },
            });

            delete user.passHash;

            // Return the saved user
            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        // If user doesn't exists throw exception
        if (!user) throw new ForbiddenException("Incorrect credentials");

        // compare password
        const pwMatches = await argon.verify(user.passHash, dto.password);

        // if password incorrect throw exception
        if (!pwMatches) throw new ForbiddenException("Incorrect credentials");

        // send back the user
        delete user.passHash;
        return user;
    }
}

