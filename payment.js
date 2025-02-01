// eSewa Payment Processing
function processEsewaPayment() {
    const params = {
        amt: 5000,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 5000,
        pid: "SB001",
        scd: "EPAYTEST",
        su: `${window.location.origin}/success.html`,
        fu: `${window.location.origin}/failure.html`
    };

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

    for (const key in params) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}

// Card Payment Modal
const modal = document.getElementById("paymentModal");
const closeBtn = document.getElementsByClassName("close")[0];
const paymentForm = document.getElementById("paymentForm");

function processCardPayment() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form validation and formatting
const cardNumber = document.getElementById("cardNumber");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");

cardNumber.addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = value.substring(0, 19);
});

expiry.addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
    }
    e.target.value = value.substring(0, 5);
});

cvv.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
});

paymentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Here you would typically send the card details to your payment processor
    // For this example, we'll just show a success message
    alert("Payment processed successfully!");
    modal.style.display = "none";
});