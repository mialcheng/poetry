document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const book = document.querySelector(".book");
    let currentPage = 0;
    const bookContainer = document.querySelector(".book-container");
    const sidebarItems = document.querySelectorAll(".sidebar li");
    const sidebar = document.querySelector(".sidebar"); // Moved out for better access

    const updateBookPosition = () => {
        if (currentPage === 0) {
            bookContainer.classList.add("center");
            bookContainer.classList.remove("shift-right");
        } else {
            bookContainer.classList.add("shift-right");
            bookContainer.classList.remove("center");
        }
    };

    const flipToPage = (targetPage) => {
        while (currentPage < targetPage) {
            pages[currentPage].classList.add("flipped");
            togglePageVisibility(currentPage, true);
            currentPage++;
        }
        while (currentPage > targetPage) {
            currentPage--;
            pages[currentPage].classList.remove("flipped");
            togglePageVisibility(currentPage, false);
        }
        updateZIndex();
        updateBookPosition();
        // updateSidebarVisibility();
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

    // const updateSidebarVisibility = () => {
    //     if (currentPage > 0 && currentPage < pages.length - 1) {
    //         sidebar.style.visibility = "visible"; // Show sidebar for middle pages
    //     } else {
    //         sidebar.style.visibility = "hidden"; // Hide sidebar for first and last pages
    //     }
    // };

    // Sidebar navigation
    sidebarItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetPage = parseInt(item.getAttribute("data-target"), 10);
            flipToPage(targetPage);
        });
    });


    const flipForward = () => {
        if (currentPage < pages.length) {
            pages[currentPage].classList.add("flipped");
            togglePageVisibility(currentPage, true);
            currentPage++;
            updateZIndex();
            updateBookPosition();
            updateSidebarVisibility(); // Update visibility after flipping forward
        }
    };

    const flipBackward = () => {
        if (currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove("flipped");
            togglePageVisibility(currentPage, false);
            updateZIndex();
            updateBookPosition();
            updateSidebarVisibility(); // Update visibility after flipping backward
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

    // Initialize
    updateZIndex();
    updateBookPosition();
    updateSidebarVisibility(); // Initial visibility setup
});
