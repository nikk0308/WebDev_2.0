import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVenueDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    description?: string;
}