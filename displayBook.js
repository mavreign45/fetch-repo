const url = "https://raw.githubusercontent.com/mavreign45/fetch-repo/main/books.json";

let books = [];

// Fetch book JSON from GitHub
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch book data");
        }

        return response.json();
    })
    .then(data => {
        // Your JSON contains a Books array
        books = data.Books;
        console.log("Books loaded successfully:", books);
    })
    .catch(error => {
        document.getElementById("result").textContent =
            "Unable to load book data. Please try again later.";

        console.error(error);
    });

// Search book by title
function searchBook() {
    const title = document
        .getElementById("searchTitle")
        .value
        .trim()
        .toLowerCase();

    const result = document.getElementById("result");

    if (title === "") {
        result.textContent = "Please enter a book title.";
        return;
    }

    const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(title)
    );

    if (matchingBooks.length > 0) {
        result.innerHTML = matchingBooks.map(book => `
            <div>
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Publishing Year:</strong> ${book.publicationYear}</p>
                <p><strong>Genre:</strong> ${book.genres}</p>
                <hr>
            </div>
        `).join("");
    } else {
        result.textContent = "Book not found!";
    }
}