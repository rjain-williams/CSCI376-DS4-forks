document.addEventListener("DOMContentLoaded", () => {
    const highlightBtn = document.querySelector("#highlightButton");
    const resetBtn = document.querySelector("#resetButton");
    const clearBtn = document.querySelector("#clearButton");
    const sortTitleBtn = document.querySelector("#sortTitleButton");
    const sortYearBtn = document.querySelector("#sortYearButton");
    const bookContainer = document.querySelector("#bookContainer"); 

    // ----- SORT LOGIC -----
    function sortBooks(compareFn) {
      const books = document.querySelectorAll(".book");
      const bookArray = Array.from(books).sort(compareFn);
      bookArray.forEach(book => bookContainer.appendChild(book.closest(".col")));
    }
    
    sortTitleBtn.addEventListener("click", () => {
      sortBooks((a, b) => {
        const titleA = a.querySelector("h2").textContent.toLowerCase();
        const titleB = b.querySelector("h2").textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    });
    
    sortYearBtn.addEventListener("click", () => {
      sortBooks((a, b) => {
        const yearA = parseInt(a.querySelector(".year").textContent, 10);
        const yearB = parseInt(b.querySelector(".year").textContent, 10);
        return yearA - yearB;
      });
    });

    // ----- EVENTS -----
    highlightBtn.addEventListener("click", () => {
      document.querySelectorAll(".book").forEach(book => {
        const title = book.querySelector("h2").textContent;
        if (title.length > 20) {
          book.classList.remove("border-light-pink");
          book.classList.add("border-light-pink", "border-4");
        }
      });
    });
  
    resetBtn.addEventListener("click", () => {
      document.querySelectorAll(".book").forEach(book => {
        book.classList.remove("border-light-pink", "border-4", "bg-light-pink", "text-cream", "d-none");
        book.classList.add("border-light-green");
      });
      searchInput.value = "";
    });
  
    document.querySelectorAll(".book").forEach(book => {
      book.addEventListener("click", () => {
        book.classList.add("bg-light-pink", "text-cream");
        setTimeout(() => {
          book.classList.remove("bg-light-pink", "text-cream");
        }, 1000);
      });
    });
  
    // ----- SEARCH LOGIC -----
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll(".book").forEach(book => {
        const title = book.querySelector("h2").textContent.toLowerCase();
        book.closest(".col").classList.toggle("d-none", !title.includes(query));
      });
    });
  
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      document.querySelectorAll(".book").forEach(book => {
        book.closest(".col").classList.remove("d-none");
      });
    });
  });
  