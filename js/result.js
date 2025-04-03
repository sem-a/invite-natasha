async function fetchMessages() {
  try {
    const response = await fetch("https://sem-a-invite-natasha-server-0fb7.twc1.net/");
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const messages = await response.json();

    if (messages.length === 0) {
      return;
    }

    const perepiska = document.querySelector("#perepiska");
    perepiska.innerHTML = "";

    const checkedTrue = messages.filter((message) => message.checked);
    const checkedFalse = messages.filter((message) => !message.checked);

    const displayMessages = (messageArray) => {
      messageArray.forEach((message) => {
        const container = document.createElement("div");
        const messageBlock = document.createElement("div");
        messageBlock.className = "message my";
        messageBlock.textContent = message.name;
        container.appendChild(messageBlock);
        perepiska.appendChild(container);
      });
    };

    displayMessages(checkedTrue);

    if (checkedFalse.length === 0) {
      return;
    }

    const unread = document.createElement("div");
    unread.className = "unread";
    unread.textContent = "новые сообщения";
    perepiska.appendChild(unread);

    displayMessages(checkedFalse);

    await fetch("https://sem-a-invite-natasha-server-0fb7.twc1.net/checked", { method: "PUT" });
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

// Запуск функции после загрузки страницы
document.addEventListener("DOMContentLoaded", fetchMessages);
