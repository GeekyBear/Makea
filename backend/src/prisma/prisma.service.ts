import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient { // Extends from that class because I need
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:H3adsh0t@localhost:5432/makea?schema=public'
                }
            }
        })
    }
}
