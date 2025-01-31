// import express from 'express';
// import {Book} from '../models/bookModel.js';

// const router = express.Router();

// //route for save a new book
// router.post('/',async(request,response)=>{
//     try{
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         )
//         {
//             return response.status(400).send({
//                 message:'Send all required field : title,author,publishYear',
//             })
//         }
//         const newBook={
//             title:request.body.title,
//             author:request.body.author,
//             publishYear:request.body.publishYear,
//         }
//         const book=await Book.create(newBook)
//     }catch(error)
//     {
//         console.log(error.message);
//         response.status(500).send({message : error.message})
//     }
// })

// //routes for get all book from database
// router.get('/',async(request,response)=>{
//     try{
//         const books=await Book.find({})
//         return response.status(200).json({
//             count:books.length,
//             data:books
//         })
//     }catch(error){
//         console.log(error)
//         response.status(500).send({message:error.message})
//     }
// });

// //routes for get one book from database
// router.get('/:id',async(request,response)=>{
//     try{
//         const {id}=request.params;
//         const book=await Book.findById(id)
//         return response.status(200).json(book)
//     }catch(error){
//         console.log(error)
//         response.status(500).send({message:error.message})
//     }
// });

// //route for updating the book
// router.put('/:id',async(request,response)=>{
//     try{
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         )
//         {
//             return response.status(400).send({
//                 message:'Send all required field : title,author,publishYear',
//             })
//         }
//         const{id} =request.params;
//         const result =await Book.findByIdAndUpdate(id,request.body)
//         if(!result){
//             return response.status(404).json({message:"Book not found"})
//         }
//         return response.status(200).send({message: " Book updated successfully"})



//     }
//     catch(error){
//         console.log(error.message)
//         response.status(500).send({message:error.message})
//     }
// });

// //route for delete a book
// router.delete('/:id',async (request,response)=>{
//     try{
//         const {id}=request.params
//         const result=await Book.findByIdAndDelete(id)
//         if(!result){
//             return response.status(404).json({message : "Book not found"})
//         }
//         return response.status(200).send({message:"Book deleted successfully"})

//     }catch(error){
//         console.log(error.message)
//         response.status(500).send({message:error.message})
//     }
// });

// export default router;



import express from "express";
import { Book } from "../models/bookModel.js";
import {protect}  from "../middleware/authMiddleware.js";
import { User } from "../models/userModel.js";

const router = express.Router();

/*
// Create a new book (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get all books (Protected)
router.get("/", protect, async (req, res) => {
  try {
    const books = await Book.find({user: req.user.id});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
 

});*/

// Create a new book (Protected)
router.post("/", protect, async (req, res) => {
    const { title, author, publishYear } = req.body;
    try {
  
      if (!title || !author || !publishYear) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Associate the book with the logged-in user
      const newBook = await Book.create({
        title,
        author,
        publishYear,
        user: req.user._id // Assign book to the logged-in user
      });
  
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get all books for the logged-in user (Protected)
  router.get("/", protect, async (req, res) => {
    try {
      
      const books = await Book.find({ user: req.user._id }); // Fetch only the books created by the logged-in user
      res.status(200).json({ count: books.length, data: books });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/:id", protect, async (req, res) => {
    try {
      const book = await Book.findById({ _id: req.params.id,user: req.user._id});
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json(book);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  router.put("/:id", protect, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Ensure the user owns the book before updating
      if (book.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.publishYear = req.body.publishYear || book.publishYear;
  
      const updatedBook = await book.save();
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete("/:id", protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if the logged-in user is the owner of the book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this book" });
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
