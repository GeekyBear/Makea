import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController], // Handles request
    providers: [AuthService] // Handles business logic
})

export class AuthModule { }