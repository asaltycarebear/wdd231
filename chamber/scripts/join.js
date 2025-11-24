document.addEventListener("DOMContentLoaded", () => {

    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    const mobileInput = document.getElementById("mobile");
    if (mobileInput) {
        mobileInput.addEventListener("input", function (e) {
            let digits = e.target.value.replace(/\D/g, "");
            if (!digits.startsWith("1")) digits = "1" + digits;
            let number = digits.slice(1);
            if (number.length > 10) number = number.slice(0, 10);

            let formatted = "+1";
            if (number.length > 0) formatted += " (";
            if (number.length > 3) formatted += number.slice(0, 3) + ") ";
            else if (number.length > 0) { formatted += number; e.target.value = formatted; return; }
            if (number.length > 6) formatted += number.slice(3, 6) + "-" + number.slice(6);
            else if (number.length > 3) formatted += number.slice(3);

            e.target.value = formatted;
        });
    }

    document.querySelectorAll(".open-modal").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const id = btn.dataset.modal;
            document.getElementById(id).showModal();
        });
    });

    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest("dialog").close();
        });
    });

});


document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const fields = {
        "First Name": params.get("first-name"),
        "Last Name": params.get("last-name"),
        "Email": params.get("email"),
        "Mobile Number": params.get("mobile"),
        "Business Name": params.get("organization"),
        "Submission Date": params.get("timestamp")
    };

    const output = document.getElementById("submitted-info");

    let hasData = false;

    for (const [label, value] of Object.entries(fields)) {
        if (value) {
            hasData = true;
            const row = document.createElement("p");
            row.innerHTML = `<strong>${label}:</strong> ${value}`;
            output.appendChild(row);
        }
    }

    if (!hasData) {
        output.innerHTML = "<p>No submitted data found. Please submit the form first.</p>";
    }
});

