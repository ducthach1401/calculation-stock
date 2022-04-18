import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
}));
