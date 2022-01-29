import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    UsersModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
