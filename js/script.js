// Toggle class active hamburger menu
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// klik di luar elemem untuk menghilangkan menu
const hm = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nameSpan = document.getElementById("userName");
  const modal = document.getElementById("nameModal");
  const modalNameInput = document.getElementById("modalNameInput");
  const submitNameBtn = document.getElementById("submitNameBtn");

  function showModal() {
    modal.style.display = "flex";
  }

  function hideModal() {
    modal.style.display = "none";
  }

  submitNameBtn.addEventListener("click", function () {
    const newName = modalNameInput.value.trim();
    if (newName !== "") {
      nameSpan.textContent = newName;
      hideModal();
    }
  });

  showModal();
});

document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");
  const contactForm = document.getElementById("contactForm");
  const resultDiv = document.getElementById("result");
  const resultModal = document.getElementById("resultModal");
  const modalResult = document.getElementById("modalResult");
  const closeModalBtn = document.getElementById("closeModalBtn");

  function showModal() {
    resultModal.style.display = "flex";
  }

  function hideModal() {
    resultModal.style.display = "none";
  }

  submitBtn.addEventListener("click", function () {
    const name = contactForm.name.value.trim();
    const birthdate = contactForm.birthdate.value.trim();
    const gender = contactForm.querySelector('input[name="gender"]:checked');
    const message = contactForm.message.value.trim();

    let genderValue = "Not specified";
    if (gender) {
      genderValue = gender.value;
    }

    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZoneName: "short",
      timeZone: "GMT",
    };
    const currentTime = now.toLocaleString("en-US", options);

    const resultText = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Birthdate:</strong> ${birthdate}</p>
      <p><strong>Gender:</strong> ${genderValue}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Current Time:</strong> ${currentTime}</p>
    `;

    if (!name || !birthdate || !genderValue || !message) {
      event.preventDefault(); // Mencegah pengiriman formulir jika ada input yang kosong
      const warningDiv = document.getElementById("formWarning");
      warningDiv.textContent = "* Please fill out all required fields.";
    } else {
      modalResult.innerHTML = resultText;
      showModal();
    }
    warningDiv.textContent = "";
  });

  closeModalBtn.addEventListener("click", function () {
    hideModal();
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = [
    createCard(
      "student1.jpg",
      "Alice Johnson",

      "Digital Marketing Expert with a Creative Edge",
      "Alice Johnson is a digital marketing expert known for her creative approach to online campaigns. With a strong background in social media marketing and content creation, she has helped brands engage with their audiences and build a strong online presence."
    ),
    createCard(
      "student3.jpg",
      "Michael Smith",

      "Experienced Software Engineer Passionate about Web Development",
      "Michael Smith is a seasoned software engineer with a passion for web development. With more than 8 years of experience, he has contributed to the development of various web applications, focusing on creating user-friendly interfaces and scalable solutions."
    ),
    createCard(
      "student2.jpg",
      "Emily Williams",

      "UX/UI Designer Dedicated to Creating Seamless User Experiences",
      "Emily Williams is a dedicated UX/UI designer who is passionate about creating seamless user experiences. With a background in human-centered design, she has a keen eye for detail and a knack for turning complex problems into elegant and user-friendly designs."
    ),
    createCard(
      "student4.jpg",
      "Jessica Lee",
      "Data Scientist with a Strong Analytical Mindset",
      "Jessica Lee is a data scientist known for her strong analytical mindset. With expertise in machine learning and data analysis, she has worked on various projects involving predictive modeling and insights generation from complex datasets."
    ),
    createCard(
      "student5.jpg",
      "Daniel Brown",
      "Experienced Front-End Developer and JavaScript Enthusiast",
      "Daniel Brown is an experienced front-end developer with a passion for JavaScript. He has built interactive and dynamic web applications, focusing on delivering smooth and engaging user experiences through innovative technologies and practices."
    ),
    createCard(
      "student6.jpg",
      "Sophia Martinez",
      "Graphic Designer with a Flair for Visual Storytelling",
      "Sophia Martinez is a creative graphic designer with a flair for visual storytelling. She specializes in creating compelling visual narratives through illustrations, animations, and graphic designs that capture and communicate messages effectively."
    ),
  ];

  function createCard(imageSrc, title, subtitle, description) {
    const card = document.createElement("div");
    card.classList.add("story-card");

    const cardImage = document.createElement("img");
    cardImage.src = "assets/" + imageSrc; // Menggunakan jalur relatif
    cardImage.alt = title + " Image";
    card.appendChild(cardImage);

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    const cardSubtitle = document.createElement("p");
    cardSubtitle.classList.add("subtitle");
    cardSubtitle.textContent = subtitle;
    card.appendChild(cardSubtitle);

    const cardDescription = document.createElement("p");
    cardDescription.textContent = description;
    card.appendChild(cardDescription);

    return card;
  }
  const cardsPerPage = 3;
  let currentPage = 0;

  function updateCards() {
    cardContainer.innerHTML = "";
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    for (let i = startIndex; i < endIndex && i < cards.length; i++) {
      cardContainer.appendChild(cards[i]);
      cardContainer.classList.remove("hidden"); // Hapus kelas "hidden"

      cardContainer.style.opacity = "0";
      cardContainer.style.transform = "translateY(-20px)";
      // Timeout untuk memberikan efek bergantian dengan efek transisi
      setTimeout(() => {
        cardContainer.style.transform = "translateY(0)";
        cardContainer.style.opacity = "1";
      }, 300); // Ganti 100 dengan waktu yang sesuai
    }
  }

  function updateButtons() {
    prevBtn.style.display = currentPage > 0 ? "block" : "none";
  }

  function nextPage() {
    if (currentPage < Math.ceil(cards.length / cardsPerPage) - 1) {
      currentPage++;
      updateCards();
      updateButtons();
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      updateCards();
      updateButtons();
    }
  }

  prevBtn.addEventListener("click", prevPage);
  nextBtn.addEventListener("click", nextPage);

  // Panggil fungsi untuk pertama kali
  updateCards();
  updateButtons();
});
