import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. .env dosyasından şifreli linkimizi alıyoruz
const connectionString = process.env.DATABASE_URL;

// 2. Saf bir PostgreSQL bağlantı havuzu (Pool) oluşturuyoruz
const pool = new Pool({ connectionString });

// 3. Bu havuzu Prisma'nın anlayacağı bir Adaptöre çeviriyoruz
const adapter = new PrismaPg(pool);

// 4. Ve nihayet motoru yeni adaptörle çalıştırıyoruz!
const prisma = new PrismaClient({ adapter });

export default prisma;