async function searchBooks(){

    const keyword =
        document.getElementById("searchInput").value;

    const API_KEY = "AIzaSyBkPPIxIW806fGEb8eSVbcPecefA3Wvnr8";

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${keyword}&maxResults=20&key=${API_KEY}`
    );

    const data = await response.json();

    displayBooks(data.items);
}

function displayBooks(books){

    const result =
        document.getElementById("result");

    result.innerHTML = "";

    books.forEach(book => {

        const info = book.volumeInfo;

        result.innerHTML += `
            <div class="book-card">

                <img
                src="${info.imageLinks?.thumbnail || ''}"
                >

                <h3>${info.title}</h3>

                <p>
                    ${
                        info.authors
                        ? info.authors.join(", ")
                        : "저자 정보 없음"
                    }
                </p>

            </div>
        `;
    });

}