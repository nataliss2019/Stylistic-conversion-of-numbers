function processDate() {
  // Получение значений дня, месяца и года из формы
  let day = parseInt(document.getElementById("day").value);
  let month = parseInt(document.getElementById("month").value);
  let year = parseInt(document.getElementById("year").value);

  // Проверка дня недели
  let weekDay = getDayOfWeek(day, month, year);

  // Проверка високосного года
  let leapYear = isLeapYear(year);

  // Определение текущего возраста
  let age = getAge(day, month, year);

  // Формирование строки с датой рождения в формате дд мм гггг
  let birthDateFormatted = formatBirthDate(day, month, year);

  // Вывод результатов
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
        <p>День недели: ${weekDay}</p>
        <p>Високосный год: ${leapYear ? "Да" : "Нет"}</p>
        <p>Возраст: ${age}</p>
    `;

  // Вывод даты рождения в консоль
  console.log(birthDateFormatted);
}

// Функция для определения дня недели по дате
function getDayOfWeek(day, month, year) {
  // Создание объекта даты
  let date = new Date(year, month - 1, day);
  // Массив с днями недели
  let daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  // Возвращение дня недели
  return daysOfWeek[date.getDay()];
}

// Функция для определения високосного года
function isLeapYear(year) {
  // Условие для определения високосного года
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Функция для определения текущего возраста пользователя
function getAge(day, month, year) {
  // Текущая дата
  let today = new Date();
  // Вычисление возраста
  let age = today.getFullYear() - year;
  // Проверка, отмечал ли пользователь день рождения в этом году
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }
  return age;
}

// Функция для форматирования даты рождения в виде звездочек
function formatBirthDate(day, month, year) {
  // Преобразование чисел в строки и форматирование их звездочками
  let dayString = formatNumberAsStars(day);
  let monthString = formatNumberAsStars(month);
  let yearString = formatNumberAsStars(year);

  // Объединение строк в один блок для вывода
  return combineStarPatterns(dayString, monthString, yearString);
}

// Вспомогательная функция для преобразования числа в формат звездочек
function formatNumberAsStars(number) {
  // Массив с шаблонами для цифр
  const digitPatterns = [
    " *** \n*   *\n*   *\n*   *\n *** ", // 0
    "  *  \n **  \n  *  \n  *  \n*****", // 1
    " *** \n*   *\n  ** \n *   \n*****", // 2
    " *** \n*   *\n  ** \n*   *\n *** ", // 3
    "*   *\n*   *\n*****\n    *\n    *", // 4
    "*****\n*    \n**** \n    *\n**** ", // 5
    " *** \n*    \n**** \n*   *\n *** ", // 6
    "*****\n    *\n   * \n  *  \n  *  ", // 7
    " *** \n*   *\n *** \n*   *\n *** ", // 8
    " *** \n*   *\n ****\n    *\n *** ", // 9
  ];
  // Преобразование числа в строку и замена каждой цифры на соответствующий шаблон
  return number
    .toString()
    .split("")
    .map((digit) => digitPatterns[digit]);
}

// Вспомогательная функция для объединения шаблонов цифр в строку
function combineStarPatterns(dayString, monthString, yearString) {
  let combinedPatterns = [];
  for (let i = 0; i < 5; i++) {
    let dayLine = dayString.map((pattern) => pattern.split("\n")[i]).join(" ");
    let monthLine = monthString
      .map((pattern) => pattern.split("\n")[i])
      .join(" ");
    let yearLine = yearString
      .map((pattern) => pattern.split("\n")[i])
      .join(" ");
    combinedPatterns.push(dayLine + "   " + monthLine + "   " + yearLine);
  }
  return combinedPatterns.join("\n");
}
