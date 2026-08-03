// ===============================
// BudgetBloom - script.js
// ===============================

// Dashboard Totals
let totalIncome = 0;
let totalExpenses = 0;
let totalSavings = 0;
let monthlyBudget = 0;

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
// Monthly Budget Elements
// ===============================

const budgetInput = document.getElementById("budget-input");
const saveBudgetBtn = document.getElementById("save-budget");

const budgetTotal = document.getElementById("budget-total");
const budgetRemaining = document.getElementById("budget-remaining");
const budgetUsed = document.getElementById("budget-used");
const progressBar = document.getElementById("progress-bar");

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
    updateBudget();
    renderTransactions();
    saveData();
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
    updateBudget();
    renderTransactions();
    saveData();
    clearExpenseForm();

});

saveBudgetBtn.addEventListener("click", () => {

    const amount = Number(budgetInput.value);

    if (amount <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    monthlyBudget = amount;

    updateBudget();

    saveData();

    budgetInput.value = "";

});

// ===============================
// Save Data
// ===============================

function saveData() {

    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("monthlyBudget", monthlyBudget);
}

// ===============================
// Load Data
// ===============================

function loadData() {

    const savedTransactions = localStorage.getItem("transactions");
    const savedBudget = localStorage.getItem("monthlyBudget");

    if (savedBudget) {
        monthlyBudget = Number(savedBudget);
    }

    if (savedTransactions) {

        transactions = JSON.parse(savedTransactions);
        totalIncome = 0;
        totalExpenses = 0;

        transactions.forEach(transaction => {

            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }

        });

    }

    updateDashboard();
    updateBudget();
    renderTransactions();

}


// ===============================
// Update Dashboard
// ===============================

function updateDashboard() {

    const balance = totalIncome - totalExpenses;

    totalSavings = balance > 0 ? balance : 0;

    balanceElement.textContent = `₹${balance}`;
    incomeElement.textContent = `₹${totalIncome}`;
    expenseElement.textContent = `₹${totalExpenses}`;
    savingsElement.textContent = `₹${totalSavings}`;

}

function updateBudget() {

    budgetTotal.textContent = `₹${monthlyBudget}`;

    const remaining = monthlyBudget - totalExpenses;

    budgetRemaining.textContent = `₹${remaining}`;

    let percentage = 0;

    if (monthlyBudget > 0) {

        percentage = (totalExpenses / monthlyBudget) * 100;

    }

    if (percentage > 100) {

        percentage = 100;

    }

    budgetUsed.textContent = `${percentage.toFixed(1)}%`;

    progressBar.style.width = percentage + "%";

    if (percentage < 50) {

        progressBar.style.background = "#22C55E";

    }

    else if (percentage < 80) {

        progressBar.style.background = "#FACC15";

    }

    else {

        progressBar.style.background = "#EF4444";

    }

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
    updateBudget();
    renderTransactions();
    saveData();

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
// Dark Mode
// ===============================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeToggle.textContent="☀️";

    }

    else{

        localStorage.setItem("theme","light");

        themeToggle.textContent="🌙";

    }

});

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeToggle.textContent="☀️";

}

// ===============================
// Initialize Dashboard
// ===============================

loadData();