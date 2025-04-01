const button = document.querySelector("#btn");
const inputValue = document.querySelector("#name");
const message = document.querySelector("#message");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const name = inputValue.value;

  if (!name) {
    message.innerHTML = "заполните поле выше!";
    message.classList.remove("hidden");
    return 0;
  }

  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      message.innerHTML = "спасибо! буду с нетерпением вас ждать";
    })
    .catch((err) => {
      console.error(err);
      message.innerHTML = "произошла ошибка! свяжитесь со мной лично";
    });

  message.classList.remove("hidden");
});

const gif = document.querySelector("#gif");

document.addEventListener("scroll", () => {
  const rect = gif.getBoundingClientRect();

  if (rect.y + rect.height < window.innerHeight - 150) {
    gif.classList.add('active')
  }
});
