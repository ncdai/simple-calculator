var formEl = document.getElementById("form");

var inputNumber1El = document.getElementById("inputNumber1");
var inputNumber2El = document.getElementById("inputNumber2");
var inputResultEl = document.getElementById("inputResult");
var inputOperatorSelector = 'input[name="operator"]';

var number1InvalidFeedback = document.getElementById("number1InvalidFeedback");
var number2InvalidFeedback = document.getElementById("number2InvalidFeedback");
var operatorInvalidFeedback = document.getElementById("operatorInvalidFeedback");

function cal(a, b, operator) {
  switch (operator) {
    case "sum":
      return a + b;

    case "sub":
      return a - b;

    case "mul":
      return a * b;

    case "div":
      if (b == 0) {
        inputResultEl.value = "";
        displayInputError(inputNumber2El, number2InvalidFeedback, "Không thể thực hiện phép chia cho 0. Vui lòng nhập số thứ 2 khác 0!");
        throw new Error("Divide by zero");
      }

      inputNumber2El.classList.remove("is-invalid");

      return a / b;

    default:
      return 0;
  }
}

function displayInputError(inputEl, invalidFeedbackEl, errorMessage) {
  invalidFeedbackEl.textContent = errorMessage;
  inputEl.classList.add("is-invalid");
}

function validateInputNumber1() {
  if (!inputNumber1El.value) {
    displayInputError(inputNumber1El, number1InvalidFeedback, "Vui lòng nhập một số thứ 1!");
    return false;
  }

  var number1 = Number(inputNumber1El.value);

  if (Number.isNaN(number1)) {
    displayInputError(inputNumber1El, number1InvalidFeedback, "Giá trị số thứ 1 không phải là số. Vui lòng nhập một số hợp lệ!");
    return false;
  }

  inputNumber1El.classList.remove("is-invalid");

  return true
}

function validateInputNumber2() {
  if (!inputNumber2El.value) {
    displayInputError(inputNumber2El, number2InvalidFeedback, "Vui lòng nhập một số thứ 2!");
    return false;
  }

  var number2 = Number(inputNumber2El.value);

  if (Number.isNaN(number2)) {
    displayInputError(inputNumber2El, number2InvalidFeedback, "Giá trị số thứ 2 không phải là số. Vui lòng nhập một số hợp lệ!");
    return false;
  }

  inputNumber2El.classList.remove("is-invalid");

  return true
}

function validateInputOperator() {
  var items = document.querySelectorAll(inputOperatorSelector);

  if (!document.querySelector(inputOperatorSelector + ":checked")) {
    items.forEach(function(item) {
      item.classList.add("is-invalid");
    });
    operatorInvalidFeedback.textContent = "Vui lòng chọn phép tính!";
    operatorInvalidFeedback.classList.add("d-block");
    return false;
  }

  items.forEach(function(item) {
    item.classList.remove("is-invalid");
  });
  operatorInvalidFeedback.classList.remove("d-block");

  return true;
}

function validateForm() {
  var check = true;

  if (!validateInputNumber1()) {
    check = false;
  }

  if (!validateInputNumber2()) {
    check = false;
  }

  if (!validateInputOperator()) {
    check = false;
  }

  return check;
}

inputNumber1El.addEventListener("blur", function() {
  validateInputNumber1();
});

inputNumber2El.addEventListener("blur", function() {
  validateInputNumber2();
});

formEl.addEventListener("submit", function(e) {
  e.preventDefault();

  try {
    if (!validateForm()) {
      throw new Error("Form is invalid");
    }

    var number1 = Number(inputNumber1El.value);
    var number2 = Number(inputNumber2El.value);
    var operator = document.querySelector(inputOperatorSelector + ":checked").value;

    var result = cal(number1, number2, operator);
    inputResultEl.value = result;

  } catch (error) {
    console.error(error.message);
  }
});
