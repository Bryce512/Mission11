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
    public IActionResult GetBooks(int pageNum , int resultsPerPage, [FromQuery] List<string>? categories = null)
    {
        var query = _context.Books.AsQueryable();

        if (categories != null && categories.Any()) {
            query = query.Where(c => categories.Contains(c.Category));
        }

        var totalBooks = query.Count();

        var books =  query
            .Skip((pageNum-1) * resultsPerPage)
            .Take(resultsPerPage)
            .ToList();
        

        return Ok(new
        {
            books = books,
            totalNumBooks = totalBooks
        });
    }

    [HttpGet ("getCategories")]
    public List<string> GetCategories()
    {
        var categories = _context.Books
            .Select(x => x.Category)
            .Distinct()
            .ToList();

        return categories;
    }

    [HttpGet("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }
}