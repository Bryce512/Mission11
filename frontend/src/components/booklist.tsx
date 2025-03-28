import { useEffect, useState } from "react";
import { Book } from "../types/books";

function booklist(
  {selectedCategories} : {selectedCategories: string[] }
) {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");


  // Filter books based on the search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
  const fetchBooks = async () => {
      console.log("selected Cat:",{selectedCategories})
      const catParams = selectedCategories.map((c) => 
      `categories=${encodeURIComponent(c)}`)
      .join("&")

      const response = await fetch(
        `https://localhost:5000/BookStore/AllBooks?pageNum=${page}&resultsPerPage=${resultsPerPage}${selectedCategories.length ? `&${catParams}`: ''}`
      );
      const data = await response.json();
      setBooks(data.bookList);
      setTotalResults(data.totalBooks);
      setTotalPages(Math.ceil(totalResults / resultsPerPage));
    };

    fetchBooks();
  }, [resultsPerPage, page, selectedCategories, totalResults]);

  return (
    <>
      <input
        type="text"
        placeholder="Search by book name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <br />
      {filteredBooks.map((book) => (
        <div key={book.bookId} className="card">
          <h2 className="card-title"> {book.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {book.author}
              </li>
              <li>
                <strong>Genre: </strong>
                {book.classification}
              </li>
              <li>
                <strong>Publisher: </strong>
                {book.publisher}
              </li>
              <li>
                <strong>Page Count: </strong>
                {book.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {book.price}
              </li>
              <li>
                <strong>ISBN: </strong>
                {book.isbn}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <br />

      <div>
        <button>Previous</button>

        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}

        <button>Next</button>
      </div>

      <br />
      <label>
        Results per page:
        <span> </span>
        <select
          value={resultsPerPage}
          onChange={(p) => {
            console.log("results per page: ", p.target.value);
            setResultsPerPage(Number(p.target.value));
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default booklist;
