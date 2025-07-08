let currentIndex = 0;

function isMobile() {
  return window.innerWidth <= 900;
}

function changeSlide(direction) {
  if (isMobile()) {
    // No mobile, não controla o transform para permitir scroll natural
    return;
  }

  const slide = document.getElementById("slide-queijos");
  const cards = slide.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20;
  const visibleCards = Math.floor(slide.parentElement.offsetWidth / cardWidth);
  const maxIndex = cards.length - visibleCards;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  slide.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll("#dots-queijos span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function createDots() {
  const slide = document.getElementById("slide-queijos");
  const cards = slide.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20;
  const visibleCards = Math.floor(slide.parentElement.offsetWidth / cardWidth);
  const maxIndex = cards.length - visibleCards;
  const dotsContainer = document.getElementById("dots-queijos");

  dotsContainer.innerHTML = "";

  // No mobile, dots para cada card (menos 1 porque index começa em 0)
  const dotsCount = isMobile() ? cards.length - 1 : maxIndex;

  for (let i = 0; i <= dotsCount; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      if (isMobile()) {
        // Scroll suave para o card clicado no mobile
        cards[i].scrollIntoView({ behavior: "smooth", inline: "start" });
        currentIndex = i; // atualiza índice também
        updateDots();
      } else {
        currentIndex = i;
        slide.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
      }
    });
    dotsContainer.appendChild(dot);
  }

  updateDots();
}

function onMobileScroll() {
  if (!isMobile()) return;

  const slide = document.getElementById("slide-queijos");
  const cards = slide.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth; // normalmente 100vw no mobile

  // Pega o scrollLeft atual e calcula índice aproximado do card
  const scrollLeft = slide.scrollLeft;
  const newIndex = Math.round(scrollLeft / cardWidth);

  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    updateDots();
  }
}

window.addEventListener("load", () => {
  createDots();

  // No mobile, escuta scroll para atualizar dots
  const slide = document.getElementById("slide-queijos");
  slide.addEventListener("scroll", onMobileScroll);
});

window.addEventListener("resize", () => {
  currentIndex = 0;
  const slide = document.getElementById("slide-queijos");
  if (slide) slide.style.transform = "none";
  createDots();
});


// menu responsivo 

const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const links = navLinks.querySelectorAll('a');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});


// envioEmail
 document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("4wNvJZDIIPPYXncmI"); // Sua Public Key

  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("mensagem-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusMsg.textContent = "Enviando...";
    statusMsg.style.color = "black";

    emailjs.sendForm("service_f8lolm3", "template_b7g1vk5", this)
      .then(function () {
        statusMsg.textContent = "Mensagem enviada com sucesso!";
        statusMsg.style.color = "green";
        form.reset();
      }, function (error) {
        statusMsg.textContent = "Erro ao enviar. Tente novamente.";
        statusMsg.style.color = "red";
        console.error("Erro:", error);
      });
  });
});
