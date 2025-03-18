using Microsoft.AspNetCore.Mvc;
using mission11.Models;

namespace mission11.Controllers;

[ApiController]
[Route("[controller]")]

public class BookStoreController : ControllerBase
{
    private BookstoreContext _context;
    public BookStoreController(BookstoreContext temp)
    {
        _context = temp;
    }

    [HttpGet("AllBooks")]
    public OkObjectResult GetBooks(int pageNum , int resultsPerPage)
    {
        var books =  _context.Books
            .Skip((pageNum-1) * resultsPerPage)
            .Take(resultsPerPage)
            .ToList();
        
        var totalBooks = _context.Books.Count();

        return Ok(new
        {
            bookList = books,
            totalBooks = totalBooks
        });
    }
}