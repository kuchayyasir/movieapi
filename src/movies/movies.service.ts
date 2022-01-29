import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import {
  CreateMovieDto,
  ReviewMovieDto,
  VoteMovieDto,
} from './dto/create-movie.dto';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<Movie>,
    private userService: UsersService,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    const createdMovie = new this.movieModel(createMovieDto);
    return await createdMovie.save();
  }
  async findAll(sort_by?: string, order?: string): Promise<Movie[]> {
    return await this.movieModel
      .find()
      .sort({ [sort_by]: order == 'desc' ? order : 'asc' });
  }

  async findOne(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).exec();
  }

  async addReview(id: string, review: ReviewMovieDto) {
    const movie = await this.movieModel.findById(id).exec();
    movie.reviews.push(review.review);
    movie.save();
    return movie;
  }
  async getRecommendationsMovies(id: string) {
    const user = await this.userService.findById(id);
    const fav = user.favouriteGenre;
    const movie = await this.movieModel.find({ genre: { $in: fav } }).exec();
    return movie;
  }
  async addVotes(id: string, votes: VoteMovieDto) {
    let upVote = 0;
    let downVote = 0;
    if (votes.up_votes) upVote = votes.up_votes;
    if (votes.down_votes) downVote = votes.down_votes;

    const movie = await this.movieModel
      .findOneAndUpdate(
        { id },
        [
          {
            $set: {
              up_votes: {
                $add: [{ $toInt: '$up_votes' }, upVote],
              },
              down_votes: {
                $add: [{ $toInt: '$down_votes' }, downVote],
              },
            },
          },
        ],
        { new: true },
      )
      .exec();

    return movie;
  }
}
