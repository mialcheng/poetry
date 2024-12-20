document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const book = document.querySelector(".book");
    let currentPage = 0;
  
    const updateBookPosition = () => {
      if (currentPage === 0 || currentPage === pages.length) {
        book.classList.add("center");
        book.classList.remove("shift-left");
      } else {
        book.classList.add("shift-left");
        book.classList.remove("center");
      }
    };
  
    const flipForward = () => {
      if (currentPage < pages.length) {
        pages[currentPage].classList.add("flipped");
        togglePageVisibility(currentPage, true); // Front hidden, back visible
        currentPage++;
        updateZIndex();
        updateBookPosition();
      }
    };
  
    const flipBackward = () => {
        if (currentPage > 0) {
          currentPage--;
          pages[currentPage].classList.remove("flipped");
          togglePageVisibility(currentPage, false); // Back hidden, front visible
          updateZIndex();
          updateBookPosition();
        }
      };
    
  
    const togglePageVisibility = (index, flipForward) => {
      const front = pages[index].querySelector(".front");
      const back = pages[index].querySelector(".back");
  
      if (flipForward) {
        front.style.visibility = "hidden";
        back.style.visibility = "visible";
      } else {
        front.style.visibility = "visible";
        back.style.visibility = "hidden";
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
      document
        .querySelector(".book-container")
        .scrollIntoView({ behavior: "smooth" });
    });
  
    const updateZIndex = () => {
        pages.forEach((page, index) => {
          if (page.classList.contains("flipped")) {
            page.style.zIndex = index;
          } else {
            page.style.zIndex = pages.length - index;
          }
        });
      };
      
  
    // Initial z-index setup
    updateZIndex();
  
    updateBookPosition();
  });
  