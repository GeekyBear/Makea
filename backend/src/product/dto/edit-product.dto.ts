import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class EditProductDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsOptional()
    amount?: number

    @IsNumber()
    @IsOptional()
    price?: number
}