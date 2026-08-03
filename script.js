let expenses = [];
let total = 0;

function addExpense() {
    const nameInput = document.getElementById("expense-name");
    const amountInput = document.getElementById("expense-amount");

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);

    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense and amount.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    expenses.push(expense);

    total += amount;

    updateUI();

    nameInput.value = "";
    amountInput.value = "";
}

function updateUI() {
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach(expense => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${expense.name} - ₹${expense.amount}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

function deleteExpense(id) {
    const expense = expenses.find(item => item.id === id);

    if (!expense) return;

    total -= expense.amount;

    expenses = expenses.filter(item => item.id !== id);

    updateUI();
}