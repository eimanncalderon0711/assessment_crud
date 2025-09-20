import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IsOptional, IsString, } from 'class-validator';

export class PaginationDto {
  @Type(() => Number) // 👈 transforms query param into number
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
