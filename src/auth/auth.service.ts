import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/userSignUp.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/userLogin.dto';


@Injectable()
export class AuthService {

constructor(
@InjectModel('User')
private userModel : mongoose.Model<User>,
private jwtService : JwtService
){}


async signUp(signUpDto :SignUpDto):Promise<{token : string}>{
    const { name , email , password} = signUpDto

    const hashedPass = await bcrypt.hash(password , 10)
   
    const user = await this.userModel.create({
       name , 
       email , 
       password :hashedPass
    })
   
    const token =  this.jwtService.sign ({
       id : user._id
    })
   
    return {token};
}


async login(loginDto : LoginDto):Promise<{token : string}>{

    const {email , password} = loginDto


    const user = await this.userModel.findOne({email})

    if (!user){
        throw new UnauthorizedException("Invalid Email or Password")
    }

    const isPasswordMatched = await bcrypt.compare(password , user.password)

    if (!isPasswordMatched){
        throw new UnauthorizedException("Invalid Email or Password")
    }

    const token = this.jwtService.sign({
        id : user._id
    })

    return {token};


}



}
