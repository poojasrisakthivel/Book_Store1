import express from "express";
import {PORT,uri} from "./config.js"
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routers/booksRoute.js';
import cors from 'cors';
import authRoutes from "./routers/authRoutes.js";

const app=express();

//middleware for parsing request body
app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to mern stack ')
}); 

//middleware for handling cor policy
//option 1 : allow all origins with default of cors
app.use(cors());

/*app.post('/books',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        )
        {
            return response.status(400).send({
                message:'Send all required field : title,author,publishYear',
            })
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        }
        const book=await Book.create(newBook)
    }catch(error)
    {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
})

//routes for get all book from database
app.get('/books',async(request,response)=>{
    try{
        const books=await Book.find({})
        return response.status(200).json({
            count:books.length,
            data:books
        })
    }catch(error){
        console.log(error)
        response.status(500).send({message:error.message})
    }
});

//routes for get one book from database
app.get('/books/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const book=await Book.findById(id)
        return response.status(200).json(book)
    }catch(error){
        console.log(error)
        response.status(500).send({message:error.message})
    }
});

//route for updating the book
app.put('/books/:id',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        )
        {
            return response.status(400).send({
                message:'Send all required field : title,author,publishYear',
            })
        }
        const{id} =request.params;
        const result =await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).json({message:"Book not found"})
        }
        return response.status(200).send({message: " Book updated successfully"})



    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
});

//route for delete a book
app.delete('/books/:id',async (request,response)=>{
    try{
        const {id}=request.params
        const result=await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message : "Book not found"})
        }
        return response.status(200).send({message:"Book deleted successfully"})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
});
*/
app.use('/books',booksRoute)
app.use("/api/auth", authRoutes);
mongoose
    .connect(uri)
    .then(()=>{
        console.log('App connected to MongoDB');
        app.listen(PORT,()=>{
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);

    });