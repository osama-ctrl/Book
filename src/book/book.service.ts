import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import {Query} from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel : mongoose.Model<Book>
    ){
       
    }



    async findAll(query : Query): Promise<Book[]>{


        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage -1);

        const keyword = query.keyword ? {

            title : {
                $regex : query.keyword,
                $options : "i"
            }

        } : {}
        const book = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
        if (book.length == 0) {
            throw new NotFoundException('No record found');
        }
    
        return book;
    

    }


    async crateNewBook(book : Book , user:User ): Promise<Book>{

        const data = Object.assign(book , {user : user._id});

        const newBook = await this.bookModel.create(data);
        
       
        return newBook;
    }


    async findById( id : string):Promise<Book>{

        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('No record found');
        }
    
        return book;
    }


    async updateBook(id : string , book : Book , user:User ):Promise<Book>{

        const data = Object.assign(book , {user : user._id});
        return await this.bookModel.findByIdAndUpdate(id , data , {
            new : true ,
            runValidators : true
        })
    }



    async deletteBOok(id:string , user:User ):Promise<Book>{
        const data = Object.assign(id , {user : user._id });
        return await this.bookModel.findByIdAndDelete(data)
    }
}
