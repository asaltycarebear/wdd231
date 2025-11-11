const main = document.querySelector("main");

const gridButton = document.createElement("button");
gridButton.textContent = "Grid View";
const listButton = document.createElement("button");
listButton.textContent = "List View";

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("view-toggle");
buttonContainer.appendChild(gridButton);
buttonContainer.appendChild(listButton);

main.before(buttonContainer);

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Could not fetch members.json");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error(error);
    }
}

function displayMembers(members) {
    const container = document.createElement("div");
    container.classList.add("members-container");

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            <p>${member.description}</p>
        `;

        container.appendChild(card);
    });

    main.appendChild(container);
}

function equalizeCardHeights() {
    const cards = document.querySelectorAll(".members-container .card");
    let maxHeight = 0;

    cards.forEach(card => card.style.height = "auto");

    cards.forEach(card => {
        if (card.offsetHeight > maxHeight) {
            maxHeight = card.offsetHeight;
        }
    });

    cards.forEach(card => {
        card.style.height = maxHeight + "px";
    });
}


gridButton.addEventListener("click", () => {
    document.querySelector(".members-container").classList.add("grid");
    document.querySelector(".members-container").classList.remove("list");
});

listButton.addEventListener("click", () => {
    document.querySelector(".members-container").classList.add("list");
    document.querySelector(".members-container").classList.remove("grid");
});

getMembers();
