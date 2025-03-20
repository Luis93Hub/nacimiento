document.addEventListener("DOMContentLoaded", () => {
  startConfetti();
  setBirthDate();
});

const texts = {
  es: {
      greeting: "¡Bienvenido al mundo, Loan! 🎉",
      birthText: "Hoy, {date}, es un día especial porque Loan ha nacido. ¡Felicidades! 🎂"
  },
  en: {
      greeting: "Welcome to the world, Loan! 🎉",
      birthText: "Today, {date}, is a special day because Loan has been born. Congratulations! 🎂"
  },
  fi: {
      greeting: "Tervetuloa maailmaan, Loan! 🎉",
      birthText: "Tänään, {date}, on erityinen päivä, koska Loan on syntynyt. Onneksi olkoon! 🎂"
  }
};

function setBirthDate() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById("birth-date").textContent = dateStr;
}

function changeLanguage(lang) {
  const today = new Date();
  let dateStr = "";

  if (lang === "es") {
      dateStr = today.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  } else if (lang === "en") {
      dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } else if (lang === "fi") {
      dateStr = today.toLocaleDateString('fi-FI', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  document.getElementById("greeting").textContent = texts[lang].greeting;
  document.getElementById("birth-text").textContent = texts[lang].birthText.replace("{date}", dateStr);
}

// 🎊 Confeti animado
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiParticles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngleIncrement: Math.random() * 0.1 + 0.04
  }));

  function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.fill();
      });
      updateConfetti();
  }

  function updateConfetti() {
      confettiParticles.forEach(p => {
          p.y += p.d;
          p.x += Math.sin(p.tilt) * 2;
          p.tilt += p.tiltAngleIncrement;
          if (p.y > canvas.height) p.y = 0;
      });
  }

  function animateConfetti() {
      drawConfetti();
      requestAnimationFrame(animateConfetti);
  }

  animateConfetti();
}
