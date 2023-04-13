let result = document.getElementById('result');

function insert(num) {
  result.value += num;
}

function clearDisplay() {
  result.value = '';
}

function calculate() {
  result.value = new Function(result.value);
}
