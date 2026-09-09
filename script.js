/* ==========================================================================
   MAMPI - MEDICINA ANCESTRAL & BIENESTAR NATURAL
   Lógica de Interacción JavaScript
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initCategoryFilters();
  initFAQAccordion();
});

/* 1. Navbar Scroll Effect & Active Section Tracking */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    // Añadir sombra y reducir padding al hacer scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Actualizar enlace activo según la sección en vista
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}

/* 2. Menú Móvil */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".nav-link, .nav-btn").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileToggle.querySelector("i").className = "fa-solid fa-bars";
      });
    });
  }
}

/* 3. Filtros del Catálogo */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const itemCards = document.querySelectorAll(".item-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Cambiar botón activo
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      itemCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "todos" || filterValue === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/* 4. Modal con Información Detallada */
const itemData = {
  ayahuasca: {
    title: "Ayahuasca (Yagé)",
    subtitle: "Banisteriopsis caapi & Psychotria viridis",
    category: "Planta Sagrada de la Amazonía",
    description:
      "La Ayahuasca es una medicina vegetal milenaria preparada mediante la cocción prolongada de la liana Banisteriopsis caapi y las hojas de la planta Chacruna. Ha sido salvaguardada durante milenios por pueblos indígenas de la cuenca amazónica como la comunidad Shipibo-Conibo, Asháninka y Kichwa.",
    usos: "Facilita la catarsis emocional, la reconexión con el ser interno, la superación de traumas y duelos, y el despertar espiritual.",
    ciencia:
      "La liana aporta inhibidores de la monoaminooxidasa (MAO-I) que permiten la biodisponibilidad del DMT presente en la Chacruna. Estudios recientes observan estimulación de la neurogénesis en el hipocampo.",
    respeto:
      "Requiere dieta de preparación estricta, ambiente ceremonial seguro con guías experimentados y evaluación de interacciones con medicamentos antidepresivos.",
  },
  psilocybes: {
    title: "Hongos Psilocybes",
    subtitle: "Teonanácatl / Niños Santos",
    category: "Hongos Sagrados Tradicionales",
    description:
      'Conocidos en la tradición mesoamericana como "Teonanácatl" (Carne de los Dioses), inmortalizados en Oaxaca por la sabia curandera María Sabina. Han formado parte de los ritos de sanación física y mística desde tiempos precolombinos.',
    usos: "Promueven la disolución del ego, estados de gratitud profunda, apertura afectiva y reconexión con la naturaleza.",
    ciencia:
      "La psilocibina se convierte en psilocina en el cuerpo, modulando la red de modo predeterminado (DMN) del cerebro. El Imperial College London y Johns Hopkins investigan su alto impacto contra la depresión resistente y la ansiedad.",
    respeto:
      "Abordados desde la intención sagrada, preparación previa, contención durante la sesión e integración psicológica posterior.",
  },
  "melena-leon": {
    title: "Melena de León",
    subtitle: "Hericium erinaceus",
    category: "Hongo Medicinal Nootrópico",
    description:
      "Un hongo fascinante con apariencia de cascada blanca. Muy preciado en la medicina tradicional asiática por proteger el sistema digestivo y potenciar las facultades mentales.",
    usos: "Mejora la concentración, la memoria de trabajo, la regeneración neuronal y la salud de la microbiota intestinal.",
    ciencia:
      "Contiene erinacinas y hericenonas, compuestos capaces de atravesar la barrera hematoencefálica y estimular la síntesis del Factor de Crecimiento Nervioso (NGF).",
    respeto:
      "No es psicoactivo. Ideal para consumo diario en infusiones, extractos dobles o cápsulas estandarizadas.",
  },
  cacao: {
    title: "Cacao Ceremonial",
    subtitle: "Theobroma cacao (Semilla Sagrada)",
    category: "Planta de Apertura de Corazón",
    description:
      "El Cacao ceremonial es chocolate en su estado nativo, puro, orgánico y sin procesos industriales. Venerado por los Mayas y Aztecas como un elixir divino que conecta el cuerpo físico con la devoción espiritual.",
    usos: "Abre el centro energético del corazón, inspira la creatividad artística, suave estimulación energética y presencia meditativa.",
    ciencia:
      'Rico en teobromina (vasodilatador suave), anandamida (la "molécula de la dicha"), magnesio, antioxidantes y triptófano.',
    respeto:
      "Ideal para círculos de sonido, meditación, danza consciente y trabajo de integración profunda.",
  },
  reishi: {
    title: "Reishi (Lingzhi)",
    subtitle: "Ganoderma lucidum",
    category: "Hongo de la Longevidad & Calma Shen",
    description:
      'Denominado "el hongo de la inmortalidad" en la antigua China. Los monjes taoístas lo utilizaban para apaciguar la mente, cultivar la meditación y fortalecer la energía vital (Qi).',
    usos: "Reducción del estrés crónico, inducción a un sueño profundo, modulación inmunológica y apoyo hepático.",
    ciencia:
      "Contiene betaglucanos e inmunomoduladores junto a triterpenos que ayudan a regular la respuesta inflamatoria y la presión arterial.",
    respeto:
      "Consumo continuo como tónico adaptógeno diario en tinturas o polvos solubles.",
  },
  ashwagandha: {
    title: "Ashwagandha",
    subtitle: "Withania somnifera",
    category: "Raíz Adaptógena Ayurveda",
    description:
      'Una de las plantas pilares del sistema médico tradicional de la India (Ayurveda). Su nombre significa "aroma de caballo", aludiendo a la fuerza y vitalidad que otorga a quien la consume.',
    usos: "Calma la ansiedad, nivela el cortisol en momentos de alta exigencia, mejora la estamina y la calidad del sueño.",
    ciencia:
      "Los witanólidos presentes en sus raíces regulan el eje Hipotálamo-Hipófisis-Adrenal (HPA), estabilizando la respuesta fisiológica al estrés.",
    respeto:
      "Se recomienda tomar en las noches o al atardecer para restaurar el sistema nervioso.",
  },
  wachuma: {
    title: "Wachuma (San Pedro)",
    subtitle: "Echinopsis pachanoi",
    category: "Cactus Sagrado Andino",
    description:
      "Cactus ancestral de la cordillera de los Andes con más de 3,000 años de historia de uso en culturas como Chavín de Huántar, Moche y Chimú.",
    usos: "Sanación del plano emocional, reconexión con los elementos de la naturaleza, claridad de rumbo y apertura de la compasión.",
    ciencia:
      "Contiene la sustancia mescalina de liberación progresiva, brindando una experiencia expansiva, lúcida y terrestre.",
    respeto:
      "Cuidado amoroso, dieta liviana y trabajo conducido en la naturaleza con profundo respeto a la Pachamama.",
  },
  cordyceps: {
    title: "Cordyceps Militaris",
    subtitle: "Hongo de Energía Vital & ATP",
    category: "Hongo Adaptógeno Vital",
    description:
      "Un hongo singular originario de las altas montañas del Himalaya. Históricamente reservado para la realeza imperial por su capacidad de rejuvenecimiento.",
    usos: "Aumento de la energía celular sin el nerviosismo del café, optimización pulmonar y resistencia física.",
    ciencia:
      "La cordicepina y adenosina estimulan la producción celular de Trifosfato de Adenosina (ATP) e incrementan la absorción eficiente de oxígeno.",
    respeto:
      "Ideal para tomar por las mañanas previo a actividades de concentración o ejercicio.",
  },
  rhodiola: {
    title: "Rhodiola Rosea",
    subtitle: "Raíz de Oro Ártica",
    category: "Adaptógeno del Enfoque",
    description:
      "Planta silvestre que crece en los suelos fríos de Siberia y Escandinavia, empleada históricamente por guerreros para mantener el vigor en climas severos.",
    usos: 'Superación del agotamiento mental o "burnout", mejora de la agilidad cognitiva y estabilización del ánimo.',
    ciencia:
      "Rica en rosavina y salidrosida, optimiza los niveles de dopamina y serotonina en las vías de respuesta al cansancio.",
    respeto:
      "Excelente aliado para períodos de trabajo creativo o estudio intensivo.",
  },
};

function openModal(itemId) {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const data = itemData[itemId];

  if (data && modalOverlay && modalBody) {
    modalBody.innerHTML = `
            <div class="card-category" style="display:inline-block; margin-bottom:0.8rem;">${data.category}</div>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-subtitle">${data.subtitle}</p>
            
            <p style="color:#4A4A4A; line-height:1.7; margin-bottom:1rem;">${data.description}</p>
            
            <h4 class="modal-section-h4"><i class="fa-solid fa-leaf" style="color:var(--c-terracotta);"></i> Propiedades y Usos</h4>
            <p style="font-size:0.95rem; color:#333;">${data.usos}</p>

            <h4 class="modal-section-h4"><i class="fa-solid fa-flask" style="color:var(--c-soft-gold);"></i> Perspectiva Científica</h4>
            <p style="font-size:0.95rem; color:#333;">${data.ciencia}</p>

            <h4 class="modal-section-h4"><i class="fa-solid fa-shield-halved" style="color:var(--c-sage);"></i> Enfoque Ético & Respeto</h4>
            <p style="font-size:0.95rem; color:#333;">${data.respeto}</p>
        `;
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(event) {
  const modalOverlay = document.getElementById("modal-overlay");
  if (event.target === modalOverlay) {
    closeModalForce();
  }
}

function closeModalForce() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

/* 5. FAQ Accordion */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector(".faq-answer");
      const isActive = faqItem.classList.contains("active");

      // Cerrar todos los demás
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        faqItem.classList.add("active");
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      }
    });
  });
}

/* 6. Formulario de Contacto */
function handleFormSubmit(event) {
  event.preventDefault();
  const responseDiv = document.getElementById("form-response");
  const form = document.getElementById("contact-form");

  if (responseDiv && form) {
    responseDiv.className = "form-response success";
    responseDiv.innerHTML = `
            <i class="fa-solid fa-circle-check" style="font-size:1.5rem; margin-bottom:0.5rem;"></i><br>
            <strong>¡Gracias por tu mensaje!</strong><br>
            Hemos recibido tu inquietud con respeto y confidencialidad. Nos pondremos en contacto contigo a la brevedad.
        `;
    form.reset();
  }
}
