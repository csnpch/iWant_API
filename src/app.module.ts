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
import { Member } from './member/member.model';
import { Wish } from './wish/wish.model';
import { Deliverer } from './deliverer/deliverer.model';
import pg from 'pg';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: (process.env.DB_TYPE as Dialect) || 'postgres',
        uri: process.env.DB_URI,
        autoLoadModels: true,
        models: [Member, Wish, Deliverer],
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
