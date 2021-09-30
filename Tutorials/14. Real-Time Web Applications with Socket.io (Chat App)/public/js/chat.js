const socket = io();

// Elements
const $messageForm = document.querySelector("form");
const $messageSendInput = document.querySelector("#input-message");
const $messageSendBtn = document.querySelector("#send-message");
const $messageSendLocBtn = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Query String
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// autoScroll
const autoScroll = () => {

  console.log('Herllllo')

  // New message Element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyle = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages Container
  const containerHeight = $messages.scrollHeight;

  // How far I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

// Listening messages
socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

// Listening Location
socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

// Listening Room data
socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    users,
    room,
  });

  document.querySelector("#sidebar").insertAdjacentHTML("beforeend", html);
});

// Sending messages
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageSendBtn.setAttribute("disable", "disable");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    $messageSendBtn.removeAttribute("disable");
    $messageSendInput.value = "";
    $messageSendInput.focus();

    if (error) {
      return console.error(error);
    }
    console.info("Message Delivered");
  });
});

// Sending location
document.querySelector("#send-location").addEventListener("click", () => {
  $messageSendLocBtn.setAttribute("disable", "disable");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit(
        "sendLocation",
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        () => {
          $messageSendBtn.removeAttribute("disable");
          console.log("Location shared");
        }
      );
    },
    (err) => {
      alert(`${err.message}`);
    }
  );
});

// Joining a room
socket.emit("join", { username, room }, (error) => {
  if (error) {
    location.href = "/";
    alert(error);
  }
});
