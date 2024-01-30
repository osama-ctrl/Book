import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/userSignUp.dto';
import { LoginDto } from './dto/userLogin.dto';

@Controller('auth')
export class AuthController {

constructor(private authService : AuthService){}


@Post('/signUp')

async userSignUp(@Body() signUpDto : SignUpDto):Promise<{token : string}>{
return await this.authService.signUp(signUpDto)
}



@Post('/login')

async userLogin(@Body() loginDto : LoginDto):Promise<{token: string}>{

    return await this.authService.login(loginDto)
}


}
