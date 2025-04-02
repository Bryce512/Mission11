import { Book } from "../types/books";

interface fetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  page: number,
  resultsPerPage: number,
  selectedCategories: string[]
): Promise<fetchBooksResponse> => {
  try {
        const catParams = selectedCategories.map((c) => 
        `categories=${encodeURIComponent(c)}`)
        .join("&");
  
      const response = await fetch(
        `https://localhost:5000/BookStore/AllBooks?pageNum=${page}&resultsPerPage=${resultsPerPage}${selectedCategories.length ? `&${catParams}`: ''}`);
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const data = await response.json();
  
    return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
  }
}

export const addBook = async (book: Book): Promise<void> => {
  try {
    const response = await fetch("https://localhost:5000/BookStore/AddBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};