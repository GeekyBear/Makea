import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient { // Extends from that class because I need
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });

    }

    cleandb() { // Clean Database
        return this.$transaction([
            this.category.deleteMany(),
            this.product.deleteMany(),
            this.user.deleteMany(),
        ])
    };
}