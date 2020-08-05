const socket = io();
const chatForm = document.getElementById("chatForm");
const chatMessage = document.querySelector(".chat-messages");

socket.on("message", (message) => {
  outputMessge(message);

  //Scroll down
  chatMessage.scrollTop = chatMessage.scrollHeight;
  document.getElementById("msg").value = "";
});

socket.on("disconect", (message) => {
  console.log(message);
});

//Message Submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  if (msg) socket.emit("chatMessage", msg);
});

function outputMessge(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  if (message.text) {
    div.innerHTML = ` <p class='meta'>${message.username} <span>${message.time}</span> </p>
    <p class='text'>${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
  }
}
