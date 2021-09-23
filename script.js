//I am aware about the quality this code. This is my beginning in JS.

const incomeList = document.querySelector("#incomeList");
const expenseList = document.querySelector("#expenseList");
const incomeName = document.querySelector("#incomeName");
const incomeValue = document.querySelector("#incomeValue");
const expenseName = document.querySelector("#expenseName");
const expenseValue = document.querySelector("#expenseValue");
const sumIncome = document.querySelector("#sumIncome");
const sumExpense = document.querySelector("#sumExpense");
const sumBudget = document.querySelector("#sumBudget");

//funkcja reset inputów
function resetInputs(inputs) {
  inputs.forEach(i => i.value = "")
};
/* funkcja, która określa czy dodajemy income czy expense, aby umieścić w poprawnej kolumnie
filtrujemy to także na końcu funkcji createElementLi() - 
dodatkowo resetInputs() resetyje wartośc input to kliknięciu "DODAJ"
 if (isExpense) {
    expenseList.appendChild(li);
} else {
  incomeList.appendChild(li);    
*/
function addIncome() {
  createElementLi(incomeName.value, incomeValue.value, false);
  //funkcja reset inputów po kliknięciu
  resetInputs([incomeName, incomeValue]);
}

function addExpense() {
  createElementLi(expenseName.value, expenseValue.value, true);
  //funkcja reset inputów po kliknięciu
  resetInputs([expenseName, expenseValue]);
}


function createElementLi(name, value, isExpense) {
  const li = document.createElement("li");
  li.classList.add("li");
  const spanName = document.createElement("span");
  spanName.innerHTML = name + "\xa0";
  const spanAmount = document.createElement("span");
  spanAmount.classList.add("value");
  spanAmount.innerHTML = value + "\xa0";
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
      //po kliknięciu zaczytuje się nowa wartość zedytowana ze spamAmount po edycji
      spanAmount.dataset.amount = spanAmount.textContent;
      doneButton.remove();
      editButton.style.visibility = "visible";
      sumIncomeValue();
      sumExpenseValue();
      sumBudgetAll();
    });
  });
  if (isExpense) {
    expenseList.appendChild(li);
  } else {
    incomeList.appendChild(li);
  }
};


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
  if (budget > 0) {
    return (sumBudget.textContent =
      "Możesz jeszcze wydać: " + budget + " złotych");
  } else if (budget === 0) {
    return (sumBudget.textContent = "Bilans wynosi zero");
  } else {
    return (sumBudget.textContent =
      "Bilans jest ujemny. Jesteś na minusie: " + budget + " złotych");
  }
}

//przyciski oraz funkcje jakie się dzieją po ich kliknięciu
//jeżeli value inputów jest różne od 0 to dodaj uruchom funkcje
document.querySelector("#addP").addEventListener("click", function () {
 if(incomeValue.value.length !== 0 || incomeName.value.length !== 0) {
  addIncome();
  sumIncomeValue();
  sumBudgetAll();
 } else { 
  resetInputs([incomeName, incomeValue]);
 }
});
//przyciski oraz funkcje jakie się dzieją po ich kliknięciu
//jeżeli value inputów jest różne od 0 to dodaj uruchom funkcje
document.querySelector("#addW").addEventListener("click", function () {
  if(expenseValue.value.length !== 0 || expenseName.value.length !== 0) {
  addExpense();
  sumExpenseValue();
  sumBudgetAll();
     } else { 
  resetInputs([expenseName, expenseValue]);
 }
});
