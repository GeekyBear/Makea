import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@Controller('users')
export class ProductController {
    constructor(private userService: ProductService) { }

}
