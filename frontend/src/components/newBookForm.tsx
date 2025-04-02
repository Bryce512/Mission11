import { Book } from "../types/books";
import { useState } from "react";


function NewBookForm() {
  const [formData, setFormData] = useState<Book>({  
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  })

  return (
    <>
      <form action="">
        <h2>Add New Book</h2>
        <label>Book Title: <input type="text"/></label>
        <label>Author: <input type="text"/></label>
        <label>Publisher: <input type="text"/></label>
        <label>ISBN: <input type="text"/></label>
        <label>Classification: <input type="text"/></label>
        <label>Category: <input type="text"/></label>
        <label>Page Count: <input type="number"/></label>
        <label>Price: <input type="number"/></label>
        <button type="submit">Add Book</button>
        <button type="reset">Cancel</button>
      </form>

    </>
  );

}

export default NewBookForm;
