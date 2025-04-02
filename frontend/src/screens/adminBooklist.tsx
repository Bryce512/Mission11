import { useEffect, useState } from "react";
import { fetchBooks } from "../api/BooklistAPI";
import { Book } from "../types/books";
import '../css/adminBooklist.css';
import Pagination from "../components/pagination";



function AdminBooklist() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(page, resultsPerPage, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / resultsPerPage));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }; loadBooks();
  }, [page, resultsPerPage]);

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }

  return (
    <>
      <h1>Admin Library</h1>
      <table className="table-auto table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="px-4 py-2">Book ID</th>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Publisher</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td className="border px-4 py-2">{book.bookId}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.category}</td>
              <td className="border px-4 py-2">${book.price}</td>
              <td className="border px-4 py-2">{book.publisher}</td>
              <td>
                <button className="btn-blue text-white px-4 py-2 rounded btn-edit btn-small">
                  Edit
                </button>
                <button className="btn-red text-white px-4 py-2 rounded ml-2 btn-small">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={resultsPerPage}
        onPageChange={setPage}
        onPageSizeChange={(newSize) => {
          setResultsPerPage(newSize);
          setPage(1);
        }}
      />
    </>
  );
 
}
export default AdminBooklist;