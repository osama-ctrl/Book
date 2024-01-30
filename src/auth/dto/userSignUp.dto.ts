import { IsEmail, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";


export class SignUpDto{

    @IsString()
   readonly name : string


@IsNotEmpty()
@IsEmail({} , {message : "Please Enter Correct Email"})
readonly email : string

    @IsString()
    @MaxLength(8)
   readonly password : string



}