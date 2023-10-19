import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MONGO_URL } from './constants/common';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
