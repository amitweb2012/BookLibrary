import { useState, useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  const createBook = (title) => {
    axios.post("http://127.0.0.1:3001/books", {
      title,
    }).then((response) => {
      const updatedBooks = [...books, response.data];
      setBooks(updatedBooks);
    });
  }

  const editBookById = (id, newTitle) => {
    axios.put("http://127.0.0.1:3001/books/" + id, {
      title: newTitle,
    }).then((response) => {
      const updatedBooks = books.map((book) => {
        if (book.id === id) {
          return { ...book, ...response.data};
        }
  
        return book;
      });
      setBooks(updatedBooks);
    });
  }

  const deleteBookById = async (id) => {
    await axios.delete("http://127.0.0.1:3001/books/" + id);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  }

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;