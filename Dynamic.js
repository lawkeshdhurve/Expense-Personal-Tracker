let dataManage = document.getElementById("dataManage");
let summaryManage = document.getElementById("summaryManage");
let timeManage = document.getElementById("timeManage");

let h1 = document.createElement("h1"); //head
h1.textContent = "Add New Expense";
h1.classList.add("head1");
dataManage.appendChild(h1);
let p = document.createElement("p"); // para
p.textContent = "Record a new expense";
dataManage.appendChild(p);
let input = document.createElement("input"); //amount
input.type = "text";
input.id = "amount";
input.classList.add("input_width");
input.placeholder = "0.00";
let label = document.createElement("label"); //amount
label.setAttribute("for", "amount");

label.textContent = "Amount";
let br = document.createElement("br");
dataManage.appendChild(label);
dataManage.appendChild(br);
dataManage.appendChild(input);
let br2 = document.createElement("br");
dataManage.appendChild(br2);

let input1 = document.createElement("input"); // date
input1.type = "date";
input1.id = "date";
input1.classList.add("input_width");
input1.placeholder = "";
let label1 = document.createElement("label");
label1.setAttribute("for", "date");

label1.textContent = "Date";
let br1 = document.createElement("br");
dataManage.appendChild(label1);
dataManage.appendChild(br1);
dataManage.appendChild(input1);

let br3 = document.createElement("br");
dataManage.appendChild(br3);

let select = document.createElement("select");
select.id = "option";
select.classList.add("input_width");
let label2 = document.createElement("label");
label2.setAttribute("for", "option");
label2.textContent = "Category";
dataManage.appendChild(label2);
let br4 = document.createElement("br");
dataManage.appendChild(br4);
dataManage.appendChild(select);
let option1 = document.createElement("option");
option1.value = "food";
option1.textContent = "Food";
option1.selected = true;
select.appendChild(option1);

let option2 = document.createElement("option");
option2.value = "tranportation";
option2.textContent = "Transportation";
select.appendChild(option2);

let option3 = document.createElement("option");
option3.value = "entertainment";
option3.textContent = "Entertainment";
select.appendChild(option3);

let option4 = document.createElement("option");
option4.value = "utilities";
option4.textContent = "Utilities";
select.appendChild(option4);

let option5 = document.createElement("option");
option5.value = "healthcare";
option5.textContent = "HealthCare";
select.appendChild(option5);

let option6 = document.createElement("option");
option6.value = "shopping";
option6.textContent = "Shopping";
select.appendChild(option6);

let option7 = document.createElement("option");
option7.value = "other";
option7.textContent = "Other";
select.appendChild(option7);

let textarea = document.createElement("textarea");
textarea.id = "text";
textarea.placeholder = "Add a note(optional)";
textarea.classList.add("textarea_width");

let label3 = document.createElement("label");
label3.setAttribute("for", "text");

label3.textContent = "Note";

dataManage.appendChild(label3);
dataManage.appendChild(textarea);

let button = document.createElement("button");
button.classList.add("btn", "btn-primary");
button.textContent = "Add";
dataManage.appendChild(button);

// datamanage page complete

function createSummaryBlock(target) {
    // Heading
    let h2 = document.createElement("h2");
    h2.textContent = "Summary";
    target.appendChild(h2);

    let p2 = document.createElement("p");
    p2.textContent = "Your expense overview";
    target.appendChild(p2);

    // Total expenses block
    let totalDiv = document.createElement("div");
    totalDiv.classList.add("summary-box", "total");

    let totalLabel = document.createElement("p");
    totalLabel.textContent = "Total Expenses";

    let totalValue = document.createElement("h3");
    totalValue.classList.add("text-primary", "totalExpense");
    totalValue.textContent = "0.00";

    totalDiv.append(totalLabel, totalValue);
    target.appendChild(totalDiv);

    // Category summary block
    let catDiv = document.createElement("div");
    catDiv.classList.add("summary-sub");

    let catHead = document.createElement("h4");
    catHead.textContent = "By Category";

    let catList = document.createElement("ul");
    catList.classList.add("categorySummary");

    catDiv.append(catHead, catList);
    target.appendChild(catDiv);

    // Month summary block
    let monthDiv = document.createElement("div");
    monthDiv.classList.add("summary-sub");

    let monthHead = document.createElement("h4");
    monthHead.textContent = "By Month";

    let monthList = document.createElement("ul");
    monthList.classList.add("monthSummary");

    monthDiv.append(monthHead, monthList);
    target.appendChild(monthDiv);
}


let summaryMobile = document.getElementById("summaryManageMobile");
let summaryDesktop = document.getElementById("summaryManageDesktop");

createSummaryBlock(summaryMobile);
createSummaryBlock(summaryDesktop);


let h2List = document.createElement("h2");
h2List.textContent = "Expense List";
timeManage.appendChild(h2List);

let pList = document.createElement("p");
pList.textContent = "All your recorded expenses";
timeManage.appendChild(pList);


let filterDiv = document.createElement("div");
filterDiv.classList.add("filter-box");


let catFilter = document.createElement("select");
catFilter.id = "filterCategory";
let optAllCat = document.createElement("option");
optAllCat.value = "all";
optAllCat.textContent = "All Categories";
catFilter.appendChild(optAllCat);
filterDiv.appendChild(catFilter);


let monthFilter = document.createElement("select");
monthFilter.id = "filterMonth";
let optAllMonth = document.createElement("option");
optAllMonth.value = "all";
optAllMonth.textContent = "All Months";
monthFilter.appendChild(optAllMonth);
filterDiv.appendChild(monthFilter);

timeManage.appendChild(filterDiv);


let table = document.createElement("table");
table.classList.add("expense-table");


let thead = document.createElement("thead");
let headRow = document.createElement("tr");

["Date", "Category", "Note", "Amount", "Actions"].forEach(text => {
    let th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
});
thead.appendChild(headRow);
table.appendChild(thead);


let tbody = document.createElement("tbody");
tbody.id = "expenseTableBody";


let emptyRow = document.createElement("tr");
let td = document.createElement("td");
td.colSpan = 5;
td.textContent = "No expenses found. Add your first expense!";
td.style.textAlign = "center";
emptyRow.appendChild(td);
tbody.appendChild(emptyRow);

table.appendChild(tbody);
timeManage.appendChild(table);



// Load stored expenses on page load
document.addEventListener("DOMContentLoaded", () => {
    let storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    storedExpenses.forEach(exp => addExpenseRow(exp, false));
});

// Update localStorage
function saveExpensesToStorage(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add expense row and update summary
function addExpenseRow({
    amount,
    date,
    category,
    note
}, save = true) {
    if (tbody.contains(emptyRow)) tbody.removeChild(emptyRow);

    let formattedDate = new Date(date).toLocaleDateString("en-GB");
    let newRow = document.createElement("tr");

    [formattedDate, category, note, amount.toFixed(2)].forEach(text => {
        let td = document.createElement("td");
        td.textContent = text;
        newRow.appendChild(td);
    });

    // Actions
    let actionTd = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-sm", "btn-warning");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-sm", "btn-danger");

    actionTd.append(editBtn, deleteBtn);
    newRow.appendChild(actionTd);
    tbody.appendChild(newRow);

    updateSummary(amount, date, category);

    // Save to localStorage
    if (save) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({
            amount,
            date,
            category,
            note
        });
        saveExpensesToStorage(expenses);
    }

    // Delete
    deleteBtn.addEventListener("click", function() {
        updateSummary(-amount, date, category);
        tbody.removeChild(newRow);

        // Remove from localStorage
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses = expenses.filter(e => !(e.amount === amount && e.date === date && e.category === category && e.note === note));
        saveExpensesToStorage(expenses);

        if (!tbody.children.length) tbody.appendChild(emptyRow);
    });

    // Edit
    editBtn.addEventListener("click", function() {
        document.getElementById("amount").value = amount;
        document.getElementById("date").value = date;
        document.getElementById("option").value = category;
        document.getElementById("text").value = note;

        updateSummary(-amount, date, category);
        tbody.removeChild(newRow);

        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses = expenses.filter(e => !(e.amount === amount && e.date === date && e.category === category && e.note === note));
        saveExpensesToStorage(expenses);

        if (!tbody.children.length) tbody.appendChild(emptyRow);
    });
}

// Button click handler
button.addEventListener("click", function() {
    let amountVal = parseFloat(document.getElementById("amount").value);
    let dateVal = document.getElementById("date").value;
    let categoryVal = document.getElementById("option").value;
    let noteVal = document.getElementById("text").value;

    if (isNaN(amountVal) || !dateVal || !categoryVal) {
        alert("Please fill all required fields correctly.");
        return;
    }

    addExpenseRow({
        amount: amountVal,
        date: dateVal,
        category: categoryVal,
        note: noteVal
    });

    // Reset form
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("option").value = "food";
    document.getElementById("text").value = "";
});



function updateSummary(amountVal, dateVal, categoryVal) {
    // Update
    document.querySelectorAll(".totalExpense").forEach(totalEl => {
        let currentTotal = parseFloat(totalEl.textContent);
        totalEl.textContent = (currentTotal + amountVal).toFixed(2);
    });

    // Update category
    document.querySelectorAll(".categorySummary").forEach(catList => {
        let existing = [...catList.children].find(li => li.dataset.cat === categoryVal);
        if (existing) {
            let prev = parseFloat(existing.dataset.total);
            existing.dataset.total = (prev + amountVal).toFixed(2);
            if (parseFloat(existing.dataset.total) <= 0) {
                existing.remove();
            } else {
                existing.textContent = `${categoryVal}: ${existing.dataset.total}`;
            }
        } else if (amountVal > 0) {
            let li = document.createElement("li");
            li.dataset.cat = categoryVal;
            li.dataset.total = amountVal.toFixed(2);
            li.textContent = `${categoryVal}: ${li.dataset.total}`;
            catList.appendChild(li);
        }
    });

    // Update month
    let monthKey = new Date(dateVal).toLocaleString("default", {
        month: "long",
        year: "numeric"
    });
    document.querySelectorAll(".monthSummary").forEach(monthList => {
        let existing = [...monthList.children].find(li => li.dataset.month === monthKey);
        if (existing) {
            let prev = parseFloat(existing.dataset.total);
            existing.dataset.total = (prev + amountVal).toFixed(2);
            if (parseFloat(existing.dataset.total) <= 0) {
                existing.remove();
            } else {
                existing.textContent = `${monthKey}: ${existing.dataset.total}`;
            }
        } else if (amountVal > 0) {
            let li = document.createElement("li");
            li.dataset.month = monthKey;
            li.dataset.total = amountVal.toFixed(2);
            li.textContent = `${monthKey}: ${li.dataset.total}`;
            monthList.appendChild(li);
        }
    });
}
