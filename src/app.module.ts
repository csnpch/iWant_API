import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { WishModule } from './wish/wish.module';
import { DelivererModule } from './deliverer/deliverer.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: (process.env.DB_TYPE as Dialect) || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'iWant',
        autoLoadModels: true,
        models: [],
      }),
    }),
    MemberModule,
    WishModule,
    DelivererModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
