// ===== Global Variables =====

let totalIncome = 0;
let totalExpenses = 0;
let totalSavings = 0;

let transactions = [];

// ===== Dashboard Elements =====

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expenses");
const savingsElement = document.getElementById("savings");

// ===== Buttons =====

const addIncomeBtn = document.getElementById("add-income");
const addExpenseBtn = document.getElementById("add-expense");

addIncomeBtn.addEventListener("click", function () {

    const source = document.getElementById("income-source").value;
    const amount = Number(document.getElementById("income-amount").value);
    const date = document.getElementById("income-date").value;

    if (source === "" || amount <= 0 || date === "") {
        alert("Please fill all income details.");
        return;
    }

    totalIncome += amount;

    transactions.push({
        type: "income",
        source,
        amount,
        date
    });

    updateDashboard();
    renderTransactions();

    document.getElementById("income-source").value = "";
    document.getElementById("income-amount").value = "";
    document.getElementById("income-date").value = "";

});

function updateDashboard() {

    const balance = totalIncome - totalExpenses;

    balanceElement.textContent = `₹${balance}`;

    incomeElement.textContent = `₹${totalIncome}`;

    expenseElement.textContent = `₹${totalExpenses}`;

    savingsElement.textContent = `₹${totalSavings}`;

}

function renderTransactions() {

    const list = document.getElementById("transaction-list");

    list.innerHTML = "";

    transactions.forEach(transaction => {

        const card = document.createElement("div");

        card.classList.add("transaction-card");

        if (transaction.type === "income") {

            card.innerHTML = `
                <h3>💵 ${transaction.source}</h3>
                <p>+ ₹${transaction.amount}</p>
                <small>${transaction.date}</small>
            `;

        }

        list.appendChild(card);

    });

}

