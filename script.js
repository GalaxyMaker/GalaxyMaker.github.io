let result = document.getElementById('result');

function insert(num) {
  result.value += num;
}

function clearDisplay() {
  result.value = '';
}

function calculate() {
  result.value = eval(result.value);
}
