import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';
import {Query as ExpressQuery} from 'express-serve-static-core';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {

    constructor(private bookService : BookService){}


    @Get('/findAllBooks')
    async findAllBooks(@Query() query: ExpressQuery, @Res() response): Promise<any> {
        try {
            const allBooks = await this.bookService.findAll(query);
            return response.status(200).json(allBooks);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({
                    message: 'No records Found',
                });
            } else {
                return response.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
    }
    
    @Post('/new')
    @UseGuards(AuthGuard())
    async create( @Body() book : CreateBookDto ,  @Res() response , @Req() req ):Promise<Book>{

        try {
            const newBook = await this.bookService.crateNewBook(book , req.user)
            return response.status(200).json({
                message: "Book Created Successfully",
                newBook
            })
        } catch (error) {
            return response.status(401).json({
                message : "You dont have access to do this functionality"
            })
        }

    }

    @Get(":id")
    async bookById( @Param('id') id:string , @Res() response):Promise<Book>{
    
        try {
            const book = await this.bookService.findById(id);
            return book;
        } catch (error) {
            return response.status(401).json({
                message : "No record Found"
            })
        }
       
    }


    @Put(":id")
    @UseGuards(AuthGuard())
    
    async updateBooks(@Param('id') id:string , @Body() book : UpdateBookDto , @Req() req , @Res() response ):Promise<Book>{

        try {
           const updateBook = await this.bookService.updateBook(id , book , req.user);
           return response.status(200).json({message : "Book Updated Successfully" , updateBook})
        } catch (error) {
            return response.status(401).json({
                message : "No record Found"
            })

        }
    }



    @Delete(":id")
    @UseGuards(AuthGuard())
    async deleteBook (@Res() res , @Req() req ,  @Param('id') id:string):Promise<Book>{

        try {
            const book = await this.bookService.deletteBOok(id , req.user)
            return  res.status(200).json({message : "Book Deleted Successfully  by User with `id` : " + req.user._id})
        } catch (err) {
           return err.status(401).json({message : "No record Found"})
        }

    }

}
