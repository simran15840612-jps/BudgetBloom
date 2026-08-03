// ===============================
// BudgetBloom - script.js
// ===============================

// Dashboard Totals
let totalIncome = 0;
let totalExpenses = 0;
let totalSavings = 0;

// Stores every transaction
let transactions = [];

// ===============================
// Dashboard Elements
// ===============================

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expenses");
const savingsElement = document.getElementById("savings");

// Buttons

const addIncomeBtn = document.getElementById("add-income");
const addExpenseBtn = document.getElementById("add-expense");

// Transaction List

const transactionList = document.getElementById("transaction-list");

// ===============================
// Add Income
// ===============================

addIncomeBtn.addEventListener("click", () => {

    const source = document.getElementById("income-source").value;
    const amount = Number(document.getElementById("income-amount").value);
    const date = document.getElementById("income-date").value;

    if (source === "" || amount <= 0 || date === "") {
        alert("Please fill all income details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        type: "income",
        title: source,
        amount,
        date
    };

    transactions.push(transaction);

    totalIncome += amount;

    updateDashboard();
    renderTransactions();

    clearIncomeForm();

});

// ===============================
// Add Expense
// ===============================

addExpenseBtn.addEventListener("click", () => {

    const category = document.getElementById("expense-category").value;
    const amount = Number(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;
    const note = document.getElementById("expense-note").value;

    if (category === "" || amount <= 0 || date === "") {
        alert("Please fill all expense details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        type: "expense",
        title: category,
        amount,
        date,
        note
    };

    transactions.push(transaction);

    totalExpenses += amount;

    updateDashboard();
    renderTransactions();

    clearExpenseForm();

});

// ===============================
// Update Dashboard
// ===============================

function updateDashboard() {

    const balance = totalIncome - totalExpenses;

    balanceElement.textContent = `₹${balance}`;
    incomeElement.textContent = `₹${totalIncome}`;
    expenseElement.textContent = `₹${totalExpenses}`;
    savingsElement.textContent = `₹${totalSavings}`;

}

// ===============================
// Render Transactions
// ===============================

function renderTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(transaction => {

        const card = document.createElement("div");

        card.className = "transaction-card";

        if (transaction.type === "income") {

            card.innerHTML = `
                <h3>💵 ${transaction.title}</h3>

                <p class="income-text">+ ₹${transaction.amount}</p>

                <small>${transaction.date}</small>

                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            `;

        } else {

            card.innerHTML = `
                <h3>💸 ${transaction.title}</h3>

                <p class="expense-text">- ₹${transaction.amount}</p>

                <small>${transaction.date}</small>

                <p>${transaction.note}</p>

                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            `;

        }

        transactionList.appendChild(card);

    });

}

// ===============================
// Delete Transaction
// ===============================

function deleteTransaction(id) {

    const transaction = transactions.find(item => item.id === id);

    if (!transaction) return;

    if (transaction.type === "income") {

        totalIncome -= transaction.amount;

    } else {

        totalExpenses -= transaction.amount;

    }

    transactions = transactions.filter(item => item.id !== id);

    updateDashboard();

    renderTransactions();

}

// ===============================
// Clear Forms
// ===============================

function clearIncomeForm() {

    document.getElementById("income-source").value = "";
    document.getElementById("income-amount").value = "";
    document.getElementById("income-date").value = "";

}

function clearExpenseForm() {

    document.getElementById("expense-category").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-date").value = "";
    document.getElementById("expense-note").value = "";

}

// ===============================
// Initialize Dashboard
// ===============================

updateDashboard();

