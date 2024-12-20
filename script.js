document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const book = document.querySelector(".book");
    let currentPage = 0;
  
    const updateBookPosition = () => {
        if (currentPage === 0 || currentPage === pages.length) {
            book-container.classList.add("center");
            book-container.classList.remove("shift-left");
        } else {
            book-container.classList.add("shift-left");
            book-container.classList.remove("center");
        }
      };
  
    const flipForward = () => {
      if (currentPage < pages.length) {
        pages[currentPage].classList.add("flipped");
        currentPage++;
        updateBookPosition();
      }
    };
  
    const flipBackward = () => {
      if (currentPage > 0) {
        currentPage--;
        pages[currentPage].classList.remove("flipped");
        updateBookPosition();
      }
    };
  
    // Click to flip pages
    pages.forEach((page, index) => {
      page.addEventListener("click", () => {
        if (index === currentPage) {
          flipForward();
        } else if (index === currentPage - 1) {
          flipBackward();
        }
      });
    });
  
    // Keyboard navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        flipForward();
      } else if (event.key === "ArrowLeft") {
        flipBackward();
      }
    });
  
    // Scroll to book section
    document.querySelector(".scroll-down").addEventListener("click", () => {
      document.querySelector(".book-container").scrollIntoView({ behavior: "smooth" });
    });

    updateBookPosition();
  });
  