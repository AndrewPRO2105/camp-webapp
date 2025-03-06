window.onload = function() {
  const tabTelegram = document.getElementById('tabTelegram');
  const tabOutside = document.getElementById('tabOutside');

  const telegramForm = document.getElementById('telegramForm');
  const outsideForm = document.getElementById('outsideForm');

  const sendTelegramBtn = document.getElementById('sendTelegramBtn');
  const tgNameField = document.getElementById('tgName');
  const tgShiftField = document.getElementById('tgShift');

  const sendOutsideBtn = document.getElementById('sendOutsideBtn');
  const nameOutsideField = document.getElementById('nameOutside');
  const phoneOutsideField = document.getElementById('phoneOutside');
  const shiftOutsideField = document.getElementById('shiftOutside');

  // Объект Telegram.WebApp, если открыт в Телеграме
  const tg = window.Telegram?.WebApp;

  // Переключение вкладок
  function showTelegramForm() {
    telegramForm.style.display = 'block';
    outsideForm.style.display = 'none';
  }
  function showOutsideForm() {
    telegramForm.style.display = 'none';
    outsideForm.style.display = 'block';
  }

  // По умолчанию показываем "внутри Telegram" форму
  showTelegramForm();

  tabTelegram.addEventListener('click', showTelegramForm);
  tabOutside.addEventListener('click', showOutsideForm);

  // Отправка из Telegram
  function sendDataTelegram() {
    const data = {
      type: "request",
      name: tgNameField.value,
      shift: tgShiftField.value
    };
    const jsonData = JSON.stringify(data);

    if (tg) {
      // Внутри Telegram
      tg.sendData(jsonData); 
      tg.close();
    } else {
      // Не показываем ошибку, просто игнорируем или alert
      alert("Вы не внутри Telegram. Откройте вкладку для вне Телеграма.");
    }
  }

  // Отправка вне Telegram (через наш Flask-сервер)
  async function sendDataOutside() {
    const data = {
      name: nameOutsideField.value,
      phone: phoneOutsideField.value,
      shift: shiftOutsideField.value
    };

    try {
      const resp = await fetch("http://127.0.0.1:5000/api/send_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await resp.json();
      if (result.ok) {
        alert("Заявка отправлена боту!");
      } else {
        alert("Ошибка: " + JSON.stringify(result));
      }
    } catch (err) {
      alert("Сетевая ошибка: " + err);
    }
  }

  sendTelegramBtn.addEventListener('click', sendDataTelegram);
  sendOutsideBtn.addEventListener('click', sendDataOutside);
};
