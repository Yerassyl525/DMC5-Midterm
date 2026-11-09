const form = document.getElementById("fanForm");
const fields = ["name", "email", "age", "date", "message"];
const errorSummary = document.getElementById("errorSummary");

form.noValidate = true;

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

function checkField(field) {
    const input = document.getElementById(field);
    const error = document.getElementById(field + "Error");
    const value = input.value.trim();

    let errorMessage = "";

    if (value === "") {
        errorMessage = "This field is required.";
    } else if (field === "name" &&
        (!/^[A-Za-z ]+$/.test(value) || value.length < 2)) {
        errorMessage = "Use at least 2 English letters.";
    } else if (field === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = "Enter a valid email.";
    } else if (field === "age" &&
        (!Number.isInteger(Number(value)) ||
            Number(value) < 13 || Number(value) > 100)) {
        errorMessage = "Age must be from 13 to 100.";
    } else if (field === "date" && value > getToday()) {
        errorMessage = "Birthday cannot be in the future.";
    } else if (field === "message" && value.length < 10) {
        errorMessage = "Message must have at least 10 characters.";
    }

    input.setAttribute("aria-invalid", errorMessage ? "true" : "false");
    error.textContent = errorMessage;

    return errorMessage === "";
}

function checkCharacter() {
    const selected = document.querySelector(
        "input[name='character']:checked"
    );

    const error = document.getElementById("characterError");
    error.textContent = selected ? "" : "Choose your favorite character.";

    document.querySelectorAll("input[name='character']").forEach(function(input) {
        input.setAttribute("aria-invalid", selected ? "false" : "true");
    });

    return selected !== null;
}

fields.forEach(function(field) {
    const input = document.getElementById(field);

    input.addEventListener("blur", function() {
        checkField(field);
    });

    input.addEventListener("input", function() {
        if (input.hasAttribute("aria-invalid")) {
            checkField(field);
        }
    });
});

document.querySelectorAll("input[name='character']").forEach(function(input) {
    input.addEventListener("change", checkCharacter);
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let errors = 0;

    fields.forEach(function(field) {
        if (!checkField(field)) {
            errors++;
        }
    });

    if (!checkCharacter()) {
        errors++;
    }

    if (errors > 0) {
        errorSummary.textContent = "Please fix " + errors + " error(s).";

        const firstInvalid = form.querySelector("[aria-invalid='true']");

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    errorSummary.textContent = "";

    const result = document.getElementById("finalProfile");
    result.textContent = "";

    fields.forEach(function(field) {
        const line = document.createElement("p");

        line.textContent = field + ": " +
            document.getElementById(field).value;

        result.appendChild(line);
    });

    const character = document.querySelector(
        "input[name='character']:checked"
    );

    const characterLine = document.createElement("p");
    characterLine.textContent = "Favorite character: " + character.value;
    result.appendChild(characterLine);

    const fanLine = document.createElement("p");
    fanLine.textContent = "Fan: " +
        (document.getElementById("fan").checked ? "Yes" : "No");

    result.appendChild(fanLine);

    const colorLine = document.createElement("p");
    colorLine.textContent = "Favorite color: " +
        document.getElementById("color").value;

    result.appendChild(colorLine);

    form.reset();

    document.getElementById("successMessage").hidden = false;
});

form.addEventListener("reset", function() {
    fields.forEach(function(field) {
        const input = document.getElementById(field);

        input.removeAttribute("aria-invalid");
        document.getElementById(field + "Error").textContent = "";
    });

    document.querySelectorAll("input[name='character']").forEach(function(input) {
        input.removeAttribute("aria-invalid");
    });

    document.getElementById("characterError").textContent = "";
    errorSummary.textContent = "";
    document.getElementById("successMessage").hidden = true;
});