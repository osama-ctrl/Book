import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';
import { JwtStartegy } from './jwt.starategy';

@Module({
  imports :[
    PassportModule.register({defaultStrategy : 'jwt'}),

    JwtModule.registerAsync({
      inject : [ConfigService],
    useFactory:(config : ConfigService)=>{
      return {

        secret : config.get<string>("JWT_SECRET"),
        signOptions : {
          expiresIn : config.get<string | number>("JWT_EXPIRES")
        }

      }
    }
    
    }),
    
    MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService , JwtStartegy],
  exports : [JwtStartegy , PassportModule]
})
export class AuthModule {}
