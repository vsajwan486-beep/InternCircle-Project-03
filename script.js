
// =========================================
// PLANIFY - ENHANCED JAVASCRIPT
// =========================================


// 1. SELECT HTML ELEMENTS

const monthlyBtn = document.getElementById("monthly");
const yearlyBtn = document.getElementById("yearly");

const prices = document.querySelectorAll(".price");
const units = document.querySelectorAll(".unit");
const savingsLabels = document.querySelectorAll(".savings");

const planButtons = document.querySelectorAll("[data-plan]");

const planDialog = document.getElementById("plan-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogMessage = document.getElementById("dialog-message");

const closeDialogBtn = document.getElementById("close-dialog");
const confirmDialogBtn = document.getElementById("confirm-dialog");


// 2. CURRENCY FORMATTER

function formatPrice(value) {

    return Number(value).toLocaleString("en-IN");

}


// 3. BILLING PERIOD FUNCTION

function setPeriod(period) {

    // Update all pricing cards

    prices.forEach(function(price, index) {

        const monthlyPrice = Number(price.dataset.monthly);
        const yearlyPrice = Number(price.dataset.yearly);

        const selectedPrice =
            period === "monthly"
                ? monthlyPrice
                : yearlyPrice;

        price.textContent = formatPrice(selectedPrice);


        // Update yearly savings

        const savings = monthlyPrice * 12 - yearlyPrice;

        const savingsLabel = savingsLabels[index];

        if (period === "yearly") {

            savingsLabel.textContent =
                "You save ₹" + formatPrice(savings) + " per year";

            savingsLabel.hidden = false;

        } else {

            savingsLabel.textContent = "";
            savingsLabel.hidden = true;

        }

    });


    // Update billing labels

    units.forEach(function(unit) {

        unit.textContent =
            period === "monthly"
                ? "per month"
                : "per year";

    });


    // Update active button styling

    monthlyBtn.classList.toggle(
        "active",
        period === "monthly"
    );

    yearlyBtn.classList.toggle(
        "active",
        period === "yearly"
    );


    // Update accessibility attributes

    monthlyBtn.setAttribute(
        "aria-pressed",
        String(period === "monthly")
    );

    yearlyBtn.setAttribute(
        "aria-pressed",
        String(period === "yearly")
    );

}


// 4. MONTHLY BUTTON EVENT

monthlyBtn.addEventListener("click", function() {

    setPeriod("monthly");

});


// 5. YEARLY BUTTON EVENT

yearlyBtn.addEventListener("click", function() {

    setPeriod("yearly");

});


// 6. PLAN SELECTION DIALOG

function openPlanDialog(planName) {

    dialogTitle.textContent = "Great Choice!";

    dialogMessage.textContent =
        "You selected the " + planName + " plan. " +
        "Thank you for exploring Planify.";

    planDialog.showModal();

}


// 7. PLAN BUTTON EVENTS

planButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedPlan = button.dataset.plan;

        openPlanDialog(selectedPlan);

    });

});


// 8. CLOSE DIALOG BUTTON

closeDialogBtn.addEventListener("click", function() {

    planDialog.close();

});


// 9. CONFIRMATION BUTTON

confirmDialogBtn.addEventListener("click", function() {

    planDialog.close();

});


// 10. CLOSE DIALOG BY CLICKING OUTSIDE

planDialog.addEventListener("click", function(event) {

    if (event.target === planDialog) {

        planDialog.close();

    }

});


// 11. SET DEFAULT BILLING PERIOD

setPeriod("monthly");


// =========================================
// END OF PLANIFY JAVASCRIPT
// =========================================
