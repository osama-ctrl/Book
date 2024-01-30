import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";



export enum Category {
    IT = "IT",
    SCIENCE = "SCIENCE",
    FANTASY = "FANTASY",
    TRAVEL = "TRAVEL",
}

@Schema({
 timestamps : true
})

export class Book{

    @Prop()
    title : string;

    
    @Prop()
    description : string;


    
    @Prop()
    author : string;


    
    @Prop()
    price : number;


    category : Category

@Prop({type: mongoose.Schema.Types.ObjectId , ref : 'User'})
    user:User;

}

export const BookSchema = SchemaFactory.createForClass(Book)