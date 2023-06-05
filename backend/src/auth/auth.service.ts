import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({
})


// Stores the business logic
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { } // Importing a GLOBAL service

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

            return this.signToken(user.id, user.email);

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

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token,
        };
    }
}

