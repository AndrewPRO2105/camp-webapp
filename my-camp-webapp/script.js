// script.js

// Убедимся, что скрипт начнёт работать, когда DOM загрузится полностью.
// Для простоты можно повесить обработчик загрузки на window.onload или использовать DOMContentLoaded.
window.onload = function() {
  // Ищем элементы
  const sendBtn = document.getElementById('sendBtn');
  const nameField = document.getElementById('childName');
  const shiftSelect = document.getElementById('shift');

  // Объект Telegram.WebApp становится доступен только внутри Telegram-клиента,
  // но если открыть страницу в обычном браузере, Telegram.WebApp может быть undefined.
  // Чтобы не было ошибок, проверяем наличие tg:
  const tg = window.Telegram?.WebApp;

  // Функция отправки данных боту
  function sendDataToBot() {
    const data = {
      childName: nameField.value,
      shift: shiftSelect.value
    };

    // Превращаем в JSON-строку
    const jsonData = JSON.stringify(data);

    if (tg) {
      // Отправляем данные в бота
      tg.sendData(jsonData);
      // Можно закрыть WebApp (не обязательно):
      tg.close();
    } else {
      // Если страница открыта в обычном браузере (для теста),
      // просто покажем результат в консоли
      console.log("Данные для бота:", jsonData);
      alert("Скрипт сработал, но Telegram.WebApp не доступен в браузере. " +
            "Откройте страницу внутри Telegram для полноценной работы.");
    }
  }

  // Навешиваем обработчик клика на кнопку
  sendBtn.addEventListener('click', sendDataToBot);
};
