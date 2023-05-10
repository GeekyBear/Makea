import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable({
})


// Stores the business logic
export class AuthService {
    constructor(private prisma: PrismaService) { } // Importing a GLOBAL service

    async signup(dto: AuthDto) {
        // Generate password hash
        const hash = await argon.hash(dto.password);

        // Save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passHash: hash,
            }
        })
        // Return the saved user
        return user;
    }

    signin() {
        return { msg: 'I have signed in' }
    }
}

