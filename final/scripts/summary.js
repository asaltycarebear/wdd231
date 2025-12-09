    //Load items code here, but will need to create a different page. Will use later

// document.addEventListener("DOMContentLoaded", () => {
//     const table = document.getElementById("stocksummary");

//     // Load saved items
//     const items = JSON.parse(localStorage.getItem("items")) || [];

//     items.forEach(item => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td>${item.sku}</td>
//             <td>${item.location || ""}</td>
//             <td>${item.quantity || ""}</td>
//             <td>${item.batchLot || ""}</td>
//             <td>${item.productVersion || ""}</td>
//             <td>${item.description || ""}</td>
//             <td>${item.make || ""}</td>
//             <td>${item.model || ""}</td>
//             <td>${item.weight || ""}</td>
//             <td>${item.length || ""}</td>
//             <td>${item.width || ""}</td>
//             <td>${item.height || ""}</td>
//             <td>${item.costPerItem || ""}</td>
//             <td>${item.salePrice || ""}</td>
//         `;

//         table.appendChild(row);
//     });
// });

document.addEventListener("DOMContentLoaded", async () => {
    const table = document.getElementById("stocksummary");
    const modalContainer = document.getElementById("modalContainer");

    // Load pallets from localStorage
    const pallets = JSON.parse(localStorage.getItem("pallets")) || [];

    if (pallets.length === 0) {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 15;
        td.textContent = "No pallets received yet.";
        td.style.textAlign = "center";
        row.appendChild(td);
        table.appendChild(row);
        return;
    }

    // Table row creation
    pallets.forEach(pallet => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="lpn-click" data-lpn="${pallet.lpn}">${pallet.lpn}</td>
            <td>${pallet.sku}</td>
            <td>${pallet.location}</td>
            <td>${pallet.quantity}</td>
            <td>${pallet.batchLot}</td>
            <td>${pallet.productVersion}</td>
            <td>${pallet.description}</td>
            <td>${pallet.make}</td>
            <td>${pallet.model}</td>
            <td>${pallet.weight}</td>
            <td>${pallet.length}</td>
            <td>${pallet.width}</td>
            <td>${pallet.height}</td>
            <td>${pallet.costPerItem}</td>
            <td>${pallet.salePrice}</td>
        `;

        table.appendChild(row);

        // Add click listener to LPN cell
        row.querySelector(".lpn-click").addEventListener("click", () => {
            openModal(pallet);
        });
    });

    // Modal builder
    function openModal(pallet) {
        const totalWeight = (pallet.weight || 0) * (pallet.quantity || 0);

        //Need to change the api to digital matrix not qr code. Its not complicated enough to need a qr code.
        modalContainer.innerHTML = `
            <div class="modal-overlay"></div>

            <div class="modal-box">
                <button class="modal-close">✖</button>

                <div class="modal-content">
                    <p><strong>LPN:</strong> ${pallet.lpn}</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pallet.lpn)}" alt="LPN Code">

                    <p><strong>SKU:</strong> ${pallet.sku}</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pallet.sku)}" alt="SKU Code">

                    <p><strong>Quantity:</strong> ${pallet.quantity}</p>
                    <p><strong>Batch + Version:</strong> ${pallet.batchLot}-${pallet.productVersion}</p>
                    <p><strong>Total Weight:</strong> ${totalWeight}</p>
                </div>
            </div>
        `;

        document.querySelector(".modal-close").addEventListener("click", closeModal);
        document.querySelector(".modal-overlay").addEventListener("click", closeModal);
    }

    function closeModal() {
        modalContainer.innerHTML = "";
    }
});

