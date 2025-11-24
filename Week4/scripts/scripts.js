// Highlight the current nav menu item
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu"); /*# target id's*/
    const navMenu = document.querySelector("#nav-menu");

    menuButton.addEventListener("click", () => { /*=> is used in place of function ()*/
        navMenu.classList.toggle("open");

        /*Toggle*/ 
        if (navMenu.classList.contains("open")) {
            menuButton.textContent = "✖";
        } 
        else {
            menuButton.textContent = "☰";
        }
    });
});

const modal = document.querySelector('#myModal');
const closeModal = document.querySelector('#closeModal');
modal.showModal(); // display the modal dialog right away.
// Usually you will want to wait for a user action to show the modal dialog
closeModal.addEventListener('click', () => {
  modal.close();
});
