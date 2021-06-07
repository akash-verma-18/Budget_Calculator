let budgetButton = document.querySelector("#budget-button");
let expenseButton = document.querySelector("#expense-button");
let budgetInput = document.querySelector("#budget-amount");
let expenseType = document.querySelector("#expense-type");
let budgetAmount = document.querySelector("#show-budget");
let expenseAmount = document.querySelector("#expense-amount");
let balanceAmount = document.querySelector("#balance-amount");
let totalAmount = document.querySelector("#show-expenses");
let colorChange = document.querySelector(".reading-three");
let expenseBox = document.querySelector(".expense");
let list = document.querySelectorAll(".title");
let expenseList = [];
let itemId = 0;

/* **************** EVENT LISTENERS ********************** */

budgetButton.addEventListener("click", function(){
    submitBudgetForm();
})
expenseButton.addEventListener("click", function(){
    submitExpenseForm();
})
expenseBox.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("edit-icon")){
        editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains("delete-icon")){
        deleteExpense(event.target.parentElement);
    } 
})

/* ************* FUNCTIONS **********************************/

// submitBudgetForm
function submitBudgetForm(){
    let value = budgetInput.value;
    if(value == 0 || value < 0){
        alert("Value can't be zero or negative.")
    }else{
        console.log(value);
        budgetAmount.textContent = value;
        budgetInput.value = '';
        showBalance();
    }
}

// showBalance
function showBalance(){
    let expense = totalExpense();
    let balance = budgetAmount.textContent - expense;
    balanceAmount.textContent = balance;
    if(balance <= 0){
        colorChange.classList.remove("balance-green");
        colorChange.classList.add("balance-red");
    } else{
        colorChange.classList.remove("balance-red");
        colorChange.classList.add("balance-green");
    }
}

// totalExpense
function totalExpense(){
    let total = 0;
    if(expenseList.length > 0){
        total = expenseList.reduce(function(acc, curr){
            acc = acc + curr.amount;
            return acc;
        },0);
    }
    totalAmount.textContent = total;
    return total;
}

// submitExpenseForm
function submitExpenseForm(){
    let type = expenseType.value;
    let expend = expenseAmount.value;
    if(type == "" || expend == "" || expend < 0){
        alert("Values cannot be empty or negative.");
    }else{
        let expenditure = parseInt(expend);
        expenseType.value = "";
        expenseAmount.value = "";
        let itemList = {
            id:itemId,
            title:type,
            amount:expenditure,
        }
        itemId++;
        expenseList.push(itemList);
        addExpense(itemList);
        showBalance();
    }
}

// addExpense
function addExpense(itemList){
    let div = document.createElement("div");
    div.classList.add("expense-row");
    div.innerHTML = `    <h5 class="expense-title content">${itemList.title}</h5>
    <h5 class="expenditure content">${itemList.amount}</h5>
    <div class="expense-icons content">
        <div class="edit-icon" data-id="${itemList.id}">
            <i class="fas fa-edit"></i>
        </div>
        <div class="delete-icon" data-id="${itemList.id}">
            <i class="fas fa-trash"></i>
        </div>
    </div>
</div>`
expenseBox.appendChild(div);
}

// editExpense
function editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement;
    // remove from DOM
    expenseBox.removeChild(parent);
    let editEx = expenseList.filter(function(item){
        return item.id == id;
    }) 
    // show value
    expenseType.value = editEx[0].title;
    expenseAmount.value = editEx[0].amount;
    // remove from the expenseList
    let tempList = expenseList.filter(function(item){
        return item.id != id;
    })
    expenseList = tempList;
    showBalance();
}

// deleteExpense
function deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement;
    expenseBox.removeChild(parent);
    let editEx = expenseList.filter(function(item){
        return item.id == id;
    }) 
    let tempList = expenseList.filter(function(item){
        return item.id != id;
    })
    expenseList = tempList;
    showBalance();
}