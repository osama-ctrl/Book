import { isString } from "util";
import { Category  } from "../schemas/book.schema";
import { IsEmpty } from "@nestjs/class-validator";
import { User } from "../../auth/schemas/user.schema";


export class CreateBookDto{

    readonly title : string;


    readonly description : string;


    readonly author : string;


    readonly price : number;


    readonly category : Category;

    @IsEmpty()
    readonly user : User


    
}