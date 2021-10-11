var formEl = document.getElementById("form");

var inputNumber1El = document.getElementById("inputNumber1");
var inputNumber2El = document.getElementById("inputNumber2");
var inputResultEl = document.getElementById("inputResult");

var number1InvalidFeedback = document.getElementById("number1InvalidFeedback");
var number2InvalidFeedback = document.getElementById("number2InvalidFeedback");

function cal(a, b, operator) {
  switch (operator) {
    case "sum":
      return a + b;
    case "sub":
      return a - b;
    case "mul":
      return a * b;
    case "div":
      if (b === 0) {
        throw new Error("Divide by zero");
      }
      return a / b;
    default:
      return 0;
  }
}

function getOperator() {
  return document.querySelector('input[name="operator"]:checked').value;
}

function validateForm() {
  var number1 = Number(inputNumber1El.value);
  var number2 = Number(inputNumber2El.value);
  var operator = getOperator();

  if (Number.isNaN(number1)) {
    number1InvalidFeedback.textContent = "Giá trị số thứ 1 không phải là số. Vui lòng nhập một số hợp lệ!";
    inputNumber1El.classList.add("is-invalid");
    return false;
  } else {
    inputNumber1El.classList.remove("is-invalid");
  }

  if (Number.isNaN(number2)) {
    number2InvalidFeedback.textContent = "Giá trị số thứ 2 không phải là số. Vui lòng nhập một số hợp lệ!";
    inputNumber2El.classList.add("is-invalid");
    return false;
  } else {
    inputNumber2El.classList.remove("is-invalid");
  }

  if (operator == "div" && number2 == 0) {
    number2InvalidFeedback.textContent = "Không thể thực hiện phép chia cho 0. Vui lòng nhập số thứ 2 khác 0!";
    inputNumber2El.classList.add("is-invalid");
    return false;
  } else {
    inputNumber2El.classList.remove("is-invalid");
  }

  return true;
}

formEl.addEventListener("submit", function(e) {
  e.preventDefault();

  try {
    if (!validateForm()) {
      throw new Error("Form is invalid");
    }

    var number1 = Number(inputNumber1El.value);
    var number2 = Number(inputNumber2El.value);
    var operator = getOperator();

    var result = cal(number1, number2, operator);
    inputResultEl.value = result;

  } catch (error) {
    console.error(error.message);
  }
});
