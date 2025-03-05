// script.js

window.onload = function() {
  // -- Элементы переключения вкладок
  const tabRequest = document.getElementById('tabRequest');
  const tabFAQ = document.getElementById('tabFAQ');

  // -- Форма заявки
  const requestForm = document.getElementById('requestForm');
  const sendRequestBtn = document.getElementById('sendRequestBtn');
  const nameField = document.getElementById('childName');
  const surnameField = document.getElementById('childSurname');
  const phoneField = document.getElementById('phone');
  const shiftSelect = document.getElementById('shift');

  // -- Форма FAQ
  const faqForm = document.getElementById('faqForm');
  const sendFAQBtn = document.getElementById('sendFAQBtn');
  const faqQuestion = document.getElementById('faqQuestion');

  // Объект Telegram.WebApp (если открыто в телеграме)
  const tg = window.Telegram?.WebApp;

  // Функция переключения вкладок
  function showRequestForm() {
    requestForm.style.display = 'block';
    faqForm.style.display = 'none';
  }
  function showFAQForm() {
    requestForm.style.display = 'none';
    faqForm.style.display = 'block';
  }

  // При нажатии на вкладки
  tabRequest.addEventListener('click', showRequestForm);
  tabFAQ.addEventListener('click', showFAQForm);

  // Запуск: по умолчанию показываем форму заявки
  showRequestForm();

  // Отправка заявки
  function sendRequestToBot() {
    const data = {
      type: "request",  // помечаем, что это заявка
      childName: nameField.value,
      childSurname: surnameField.value,
      phone: phoneField.value,
      shift: shiftSelect.value
    };
    const jsonData = JSON.stringify(data);

    if (tg) {
      tg.sendData(jsonData);
      tg.close();  // Закрываем по желанию
    } else {
      console.log("Данные для бота:", jsonData);
      alert("Открыто вне Telegram. Откройте внутри Telegram для отправки.");
    }
  }

  // Отправка вопроса (FAQ)
  function sendFAQToBot() {
    const data = {
      type: "faq",
      question: faqQuestion.value
    };
    const jsonData = JSON.stringify(data);

    if (tg) {
      tg.sendData(jsonData);
      tg.close();
    } else {
      console.log("FAQ ->", jsonData);
      alert("Открыто вне Telegram. Откройте внутри Telegram для отправки.");
    }
  }

  // Назначаем обработчики клика
  sendRequestBtn.addEventListener('click', sendRequestToBot);
  sendFAQBtn.addEventListener('click', sendFAQToBot);
};
