import { IsEmail, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";


export class LoginDto{

    @IsNotEmpty()
    @IsEmail({} , {message : "Please Enter Correct email"})
   readonly email : string

    
    @MaxLength(8)
   readonly password : string
}