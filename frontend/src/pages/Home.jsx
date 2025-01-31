import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Link}from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import { RiLogoutBoxFill } from "react-icons/ri";

/*
const Home = () => {
    const[books,setBooks]=useState([]);
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        axios
        .get('http://localhost:5555/books')
        .then((response)=>{
            setBooks(response.data.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
},[]);

*/

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchBooks = async () => {
        setLoading(true);
        try {
            
          const token = localStorage.getItem("jwt"); // 🔥 Get token from local storage
          if (!token) {
            console.log(token)
            console.error("No token found. Please log in.");
            return;
          }
  
          const response = await axios.get("http://localhost:5555/books", {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 Include token in headers
            },
          });
  
          setBooks(response.data.data); // ✅ Ensure correct API response structure
        } catch (error) {
          console.error("Error fetching books:", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBooks();
      
    }, []);


    
    

  return (
    <div className='p-4'>
        {/* <div className='flex justify-between items-center ' >
       
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' /> 
            </Link>  
            <Link to='/frontpage'>
                <RiLogoutBoxFill size={30} />  
            </Link>  
              
        </div> */}
        <div className="flex items-center justify-between">
  <h1 className="text-3xl my-8">Books List</h1>
  <div className="ml-auto flex items-center space-x-2">
    <Link to="/books/create">
      <MdOutlineAddBox className="text-sky-800 text-4xl" />
    </Link>
    <Link to="/frontpage">
      <RiLogoutBoxFill size={30} />
    </Link>
  </div>
</div>
        {loading ?(
            <Spinner />
        ):(
            <table className='w-full border-separated border-spacing-2' >
                <thead>
                    <tr>
                        <th className ='border border-slate-600 rounded-md'>No</th>
                        <th className ='border border-slate-600 rounded-md'>Title</th>
                        <th className ='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className ='border border-slate-600 rounded-md max-md:hidden'>Publish</th>
                        <th className ='border border-slate-600 rounded-md '>Operations</th>

                    </tr>
                </thead>
                <tbody>
                    {books.map((book,index)=>(
                        <tr key ={book._id}className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {book.title}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.author}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {book.publishYear}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/books/details/${book._id}`}> 
                                        <BsInfoCircle className='text-2xl text-greeen-800' />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}> 
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}> 
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default Home