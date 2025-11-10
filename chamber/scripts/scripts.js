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
    const main = document.querySelector("main");
    const gridButton = document.createElement("button");
    const listButton = document.createElement("button");
    const buttonContainer = document.createElement("div");

    //toggle buttons
    gridButton.textContent = "Grid View";
    listButton.textContent = "List View";
    buttonContainer.classList.add("view-buttons");
    buttonContainer.appendChild(gridButton);
    buttonContainer.appendChild(listButton);

    //Insert buttons
    main.prepend(buttonContainer);

    //fetch and display businesses
    async function loadBusinesses() {
        try {
            const response = await fetch("data/members.json"); // path to your JSON
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            displayBusinesses(data.businesses, "grid");
        } catch (error) {
            console.error("Error fetching business data:", error);
            main.innerHTML = "<p>Unable to load member data at this time.</p>";
        }
    }

    //display businesses
    function displayBusinesses(businesses, viewType) {
        const container = document.createElement("section");
        container.classList.add("business-container", viewType);

        // Clear any existing content (except toggle buttons)
        main.querySelectorAll(".business-container").forEach(el => el.remove());

        businesses.forEach(biz => {
            const card = document.createElement("div");
            card.classList.add("business-card");

            card.innerHTML = `
                <img src="${biz.image}" alt="${biz.name} logo" loading="lazy">
                <h3>${biz.name}</h3>
                <p><strong>Address:</strong> ${biz.address}</p>
                <p><strong>Phone:</strong> ${biz.phone}</p>
                <p><a href="${biz.website}" target="_blank">Visit Website</a></p>
                <p><strong>Membership Level:</strong> ${biz.membershipLevel}</p>
            `;

            container.appendChild(card);
        });

        main.appendChild(container);
    }

    // Event listeners for toggling views
    gridButton.addEventListener("click", async () => {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayBusinesses(data.businesses, "grid");
    });

    listButton.addEventListener("click", async () => {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayBusinesses(data.businesses, "list");
    });

    // Load businesses initially in grid view
    loadBusinesses();
});

