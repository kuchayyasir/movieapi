import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  genre: string;
  @IsNotEmpty()
  release_date: string;
  @IsNotEmpty()
  @IsNumber()
  up_votes: number;
  @IsNotEmpty()
  @IsNumber()
  down_votes: number;
  @IsNotEmpty()
  reviews?: Array<string>;
}

export class ReviewMovieDto {
  
  @IsNotEmpty()
  @IsString()
  review: string;
}
export class VoteMovieDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  up_votes: number;
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  down_votes: number;
}
export class GenreMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
