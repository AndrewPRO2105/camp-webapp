// script.js (отладочная версия)

window.onload = function() {
  console.log("=== MiniApp Loaded ===");
  console.log("User Agent:", navigator.userAgent);
  console.log("window.Telegram:", window.Telegram);
  console.log("window.Telegram?.WebApp:", window.Telegram?.WebApp);

  // Дополнительное информативное сообщение (выведем его прямо на страницу)
  const debugDiv = document.createElement("div");
  debugDiv.style.backgroundColor = "#ffc";
  debugDiv.style.padding = "10px";
  debugDiv.style.margin = "10px 0";
  debugDiv.style.border = "1px solid #ccc";
  debugDiv.innerHTML = "<strong>Debug Info:</strong><br>" +
    "UserAgent: " + navigator.userAgent + "<br>" +
    "window.Telegram: " + (window.Telegram ? "Yes" : "No") + "<br>" +
    "window.Telegram.WebApp: " + (window.Telegram?.WebApp ? "Yes" : "No");

  document.body.insertBefore(debugDiv, document.body.firstChild);

  // Переключатели вкладок
  const tabRequest = document.getElementById('tabRequest');
  const tabFAQ = document.getElementById('tabFAQ');

  // Форма заявки
  const requestForm = document.getElementById('requestForm');
  const sendRequestBtn = document.getElementById('sendRequestBtn');
  const nameField = document.getElementById('childName');
  const surnameField = document.getElementById('childSurname');
  const phoneField = document.getElementById('phone');
  const shiftSelect = document.getElementById('shift');

  // Форма FAQ
  const faqForm = document.getElementById('faqForm');
  const sendFAQBtn = document.getElementById('sendFAQBtn');
  const faqQuestion = document.getElementById('faqQuestion');

  // Ссылка на объект Telegram.WebApp (если доступен)
  const tg = window.Telegram?.WebApp;

  // Сразу проверим, внутри ли Telegram
  if (tg) {
    console.log("✅ Telegram.WebApp найден. Работаем внутри Telegram клиента.");
  } else {
    console.log("❌ Telegram.WebApp не найден. Похоже, открыли во внешнем браузере.");
  }

  // Функции переключения вкладок
  function showRequestForm() {
    requestForm.style.display = 'block';
    faqForm.style.display = 'none';
  }
  function showFAQForm() {
    requestForm.style.display = 'none';
    faqForm.style.display = 'block';
  }

  // По умолчанию — форма заявки
  showRequestForm();

  tabRequest.addEventListener('click', showRequestForm);
  tabFAQ.addEventListener('click', showFAQForm);

  // Отправка заявки
  function sendRequestToBot() {
    const data = {
      type: "request",
      childName: nameField.value,
      childSurname: surnameField.value,
      phone: phoneField.value,
      shift: shiftSelect.value
    };
    const jsonData = JSON.stringify(data);
    console.log("Попытка отправки заявки:", jsonData);

    if (tg) {
      tg.sendData(jsonData);
      tg.close();
    } else {
      console.log("❌ Открыто вне Telegram. Не можем отправить.");
      alert("Открыто вне Telegram. Для отправки откройте мини-приложение внутри официального клиента Telegram!");
    }
  }

  // Отправка вопроса (FAQ)
  function sendFAQToBot() {
    const data = {
      type: "faq",
      question: faqQuestion.value
    };
    const jsonData = JSON.stringify(data);
    console.log("Попытка отправки вопроса (FAQ):", jsonData);

    if (tg) {
      tg.sendData(jsonData);
      tg.close();
    } else {
      console.log("❌ Открыто вне Telegram. Не можем отправить.");
      alert("Открыто вне Telegram. Для отправки откройте мини-приложение в Telegram!");
    }
  }

  sendRequestBtn.addEventListener('click', sendRequestToBot);
  sendFAQBtn.addEventListener('click', sendFAQToBot);
};
