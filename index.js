const colors = require('colors')

let [start, end] = process.argv.splice(2);
const regexp = new RegExp('[a-zA-Z]+');

if (!start || !end) {
  console.log('Одно из чисел введено не корректно!');
} else if (regexp.test(start) || regexp.test(end)) {
  console.log('Один из аргументов не является числом!');
} else {
  start = parseInt(start);
  end = parseInt(end);
  if (start > end) {
    console.log(
      'Задайте верный отрезок! Начальное значение не может быть больше конечного.'
    );
  } else if (start == end) {
    checkNumber(start)
      ? console.log(`${start} -  является простым числом`)
      : console.log(`${start} - не является простым числом`);
  } else {
    let steps = 0;
    for (let number of checkNumbersInSegment(start, end)) {
      printNumber(steps, number);
      steps == 2 ? (steps = 0) : steps++;
    }
  }
}

function checkNumber(start) {
  for (let i = 2; i < start; i++) {
    if (start % i == 0) {
      return 0;
    }
  }
  return 1;
}

function checkNumbersInSegment(start, end) {
  let array = [];
  let flag = false;

  for (let i = start; i <= end; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = true;
        break;
      }
      flag = false;
    }
    if (!flag && i !== 0 && i !== 1) {
      array.push(i);
    }
  }

  return array;
}

function printNumber(steps, number) {
  switch (steps) {
    case 0:
      console.log(colors.green(number));
      break;
    case 1:
      console.log(colors.yellow(number));
      break;
    case 2:
      console.log(colors.red(number));
  }
  return;
}