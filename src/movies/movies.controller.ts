import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  CreateMovieDto,
  GenreMovieDto,
  ReviewMovieDto,
  VoteMovieDto,
} from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private userService: UsersService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query('sort_by') sort_by: string, @Query('order') order: string) {
    console.log(sort_by);
    console.log(order);
    return this.moviesService.findAll(sort_by, order);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/recomdations')
  rec(@Req() req) {
    let id = req.user.id;
    console.log(id);
    // return [id];
    return this.moviesService.getRecommendationsMovies(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/add-review/:id')
  addReview(@Param('id') id: string, @Body() review: ReviewMovieDto) {
    return this.moviesService.addReview(id, review);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/add-votes/:id')
  addVotes(@Param('id') id: string, @Body() vote: VoteMovieDto) {
    return this.moviesService.addVotes(id, vote);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/set-favourite')
  setFavouriteGenre(@Req() req: any, @Body() genre: GenreMovieDto) {
    console.log(genre);
    console.log(req.user.id);
    let id = req.user.id;
    return this.userService.findByIdSetFavourite(id, genre);
  }
}
