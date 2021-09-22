const incomeList = document.querySelector("#incomeList");
const expenseList = document.querySelector("#expenseList");
const incometName = document.querySelector("#incomeName");
const incomeValue = document.querySelector("#incomeValue");
const expenseName = document.querySelector("#expenseName");
const expenseValue = document.querySelector("#expenseValue");
const sumIncome = document.querySelector("#sumIncome");
const sumExpense = document.querySelector("#sumExpense");
const sumBudget = document.querySelector("#sumBudget");

/* funkcja, która określa czy dodajemy income czy expense, aby umieścić w poprawnej kolumnie
filtrujemy to także na końcu funkcji createElementLi - 
 if (isExpense) {
    expenseList.appendChild(li);
} else {
  incomeList.appendChild(li);    
*/
function addIncome() {
  createElementLi(incometName.value, incomeValue.value, false);
}

function addExpense() {
  createElementLi(expenseName.value, expenseValue.value, true);
}

function createElementLi(name, value, isExpense) {
  const li = document.createElement("li");
  li.classList.add("li");
  const spanName = document.createElement("span");
  spanName.innerHTML = name;
  const spanAmount = document.createElement("span");
  spanAmount.classList.add("value");
  spanAmount.innerHTML = value + "zł";
  //dataset.amount - wyciąga wartość ze SPAN
  spanAmount.dataset.amount = value;
  li.appendChild(spanName);
  li.appendChild(spanAmount);
  const div = document.createElement("div");
  div.classList.add("li-btns");
  li.appendChild(div);
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  editButton.innerHTML = "Edytuj";
  editButton.classList.add("edit");
  deleteButton.innerHTML = "Usuń";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", function () {
    li.remove();
    spanAmount.dataset.amount = 0;
    //dzieki hoisting możemu użyć funckji tworzony w kodzie poniżej, w kodzie wyżej
    sumIncomeValue();
    sumExpenseValue();
    sumBudgetAll();
  });
  editButton.addEventListener("click", function () {
    spanName.contentEditable = true;
    spanAmount.contentEditable = true;
    editButton.style.visibility = "hidden";
    const doneButton = document.createElement("button");
    doneButton.innerHTML = "Gotowe";
    doneButton.classList.add("done");
    div.appendChild(doneButton);
    doneButton.addEventListener("click", function () {
      spanName.contentEditable = false;
      spanAmount.contentEditable = false;
      doneButton.remove();
      editButton.style.visibility = "visible";
    });
  });
  if (isExpense) {
    expenseList.appendChild(li);
  } else {
    incomeList.appendChild(li);
  }
}

// sumowanie wartości incomes ze span
function sumIncomeValue() {
  const sumIn = [...document.querySelectorAll("#incomeList .value")].reduce(
    (acc, income) => {
      return acc + Number(income.dataset.amount);
    },
    0
  );
  sumIncome.textContent = sumIn + "zł";
  return sumIn; //return aby funkcja nie była pusta i coś zwracała, jakąś wartość
}
// sumowanie wartości expense ze span
function sumExpenseValue() {
  const sumEx = [...document.querySelectorAll("#expenseList .value")].reduce(
    (acc, expense) => {
      return acc + Number(expense.dataset.amount);
    },
    0
  );
  sumExpense.textContent = sumEx + "zł";
  return sumEx; //return aby funkcja nie była pusta i coś zwracała, jakąś wartość
}

//funkcja odejmująca expenses od incomes i zwracająca ją w DOM
function sumBudgetAll() {
  const budget = sumIncomeValue() - sumExpenseValue();
  sumBudget.textContent = budget + "zł";
}

//przyciski oraz funkcje jakie się dzieją po ich kliknięciu
document.querySelector("#addP").addEventListener("click", function () {
  addIncome();
  sumIncomeValue();
  sumBudgetAll();
});

document.querySelector("#addW").addEventListener("click", function () {
  addExpense();
  sumExpenseValue();
  sumBudgetAll();
});
