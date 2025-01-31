import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  /*useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };*/
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const token = localStorage.getItem("jwt"); // 🔥 Retrieve token

      if (!token) {
        console.error("No token found. Please log in.");
        enqueueSnackbar("No token found. Please log in.", { variant: "error" });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      } catch (error) {
        console.error("Error fetching book:", error.response?.data || error.message);
        enqueueSnackbar("Error fetching book", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, enqueueSnackbar]);

  // ✅ Handle book update
  const handleEditBook = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (!title || !author || !publishYear) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      enqueueSnackbar("No token found. Please log in.", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5555/books/${id}`,
        { title, author, publishYear },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      enqueueSnackbar("Book updated successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error.message);
      enqueueSnackbar("Error updating book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}


export default EditBook