document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.querySelector("#clearButton");
    const sortTitleBtn = document.querySelector("#sortTitleButton");
    const sortAuthorBtn = document.querySelector("#sortAuthorButton");
    const sortYearBtn = document.querySelector("#sortYearButton");
    const clearSelectionBtn = document.querySelector("#clearSelectionButton");
    const genreFilter = document.querySelector("#genreFilter");
    const bookContainer = document.querySelector("#bookContainer"); 

    document.querySelectorAll(".book").forEach((book, i) => {
      const bookTooltips = [
          "In which themes of wealth, love, and societal decay in 1920s America are explored.",
          "In which themes of racial injustice and moral growth are explored through the perspective of a young girl in the American South.",
          "In which the consequences of totalitarianism, surveillance, and the manipulation of truth are examined.",
          "In which the relationship between Elizabeth Bennet and Mr. Darcy implicitly comments on social class and marriage in 19th-century England.",
          "In which Captain Ahab relentlessly pursues the white whale that maimed him.",
          "In which a disillusioned teenager struggles to understand his place in the world.",
          "In which a reluctant hero embarks on a fantasy adventure to recover treasure.",
          "In which a cautionary tale about one fireman’s crisis of conscience unfolds in a future society where books are banned.",
          "In which the story of an orphaned young woman’s journey to independence is intertwined with her complex relationship with her employer, Mr. Rochester.",
          "In which a story of passionate yet destructive love unfolds against the backdrop of the isolated Yorkshire moors."
      ];

      // Add tooltips
      book.setAttribute("data-bs-toggle", "tooltip");
      book.setAttribute("title", bookTooltips[i]);

      book.selected_flag = false;
      book.addEventListener("click", () => {
        if (book.selected_flag) {
          book.classList.remove("bg-selected-green");
          book.selected_flag = false;
        } else {
          book.classList.add("bg-selected-green");
          book.selected_flag = true;
        }
      });
    });


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

    sortAuthorBtn.addEventListener("click", () => {
      sortBooks((a, b) => {
        const authorA = a.querySelector(".card-text").textContent.toLowerCase();
        const authorB = b.querySelector(".card-text").textContent.toLowerCase();
        const splitA = authorA.split(' ');
        const aA = splitA[splitA.length - 1];
        const splitB = authorB.split(' ');
        const bB = splitB[splitB.length - 1];
        return aA.localeCompare(bB);
      });
    });
    
    sortYearBtn.addEventListener("click", () => {
      sortBooks((a, b) => {
        const yearA = parseInt(a.querySelector(".year").textContent, 10);
        const yearB = parseInt(b.querySelector(".year").textContent, 10);
        return yearA - yearB;
      });
    });

    clearSelectionBtn.addEventListener("click", () => {
      const books = document.querySelectorAll(".book");
      const bookArray = Array.from(books);
      bookArray.forEach(book => {
        book.classList.remove("bg-selected-green");
        book.selected_flag = false;
      });
    });


    genreFilter.addEventListener("change", () => {
      const selectedGenre = genreFilter.value;
      document.querySelectorAll(".book").forEach(book => {
        const genre = book.querySelector(".genre").textContent.toLowerCase();
        const shouldShow = selectedGenre === "all" || genre === selectedGenre;
        book.closest(".col").classList.toggle("d-none", !shouldShow);
      });
    });

    // ----- EVENTS -----
    // Activate tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  
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
  