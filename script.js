document.addEventListener('DOMContentLoaded', () => {

  // 1. Мобільне меню (Гамбургер)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 2. Плавна прокрутка до секцій та закриття меню на мобільних
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (navMenu) navMenu.classList.remove('open');

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Scrollspy: Автоматичне підсвічування пунктів меню під час прокручування
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeNav = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
      
      if (activeNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeNav.classList.add('active-link');
        } else {
          activeNav.classList.remove('active-link');
        }
      }
    });
  });

  // 4. Перемикач тижнів у розкладі (< та >)
  const dateNavSpan = document.querySelector('.schedule-date-nav span');
  const dateNavArrows = document.querySelectorAll('.schedule-date-nav .nav-arrow');

  const weeks = [
    '12–18 жовтня 2026',
    '19–25 жовтня 2026',
    '26 жовтня – 1 листопада 2026',
    '2–8 листопада 2026'
  ];
  let currentWeekIndex = 1;

  if (dateNavArrows.length >= 2 && dateNavSpan) {
    dateNavArrows[0].addEventListener('click', () => {
      if (currentWeekIndex > 0) {
        currentWeekIndex--;
        dateNavSpan.textContent = weeks[currentWeekIndex];
      }
    });

    dateNavArrows[1].addEventListener('click', () => {
      if (currentWeekIndex < weeks.length - 1) {
        currentWeekIndex++;
        dateNavSpan.textContent = weeks[currentWeekIndex];
      }
    });
  }

  // 5. Генерація розкладу
  const scheduleData = [
    {
      day: '19', name: 'Понеділок', classes: [
        { time: '08:00', title: 'Functional', instructor: 'Андрій Бондар', type: 'power' },
        { time: '13:00', title: 'Pilates', instructor: 'Марія Коваль', type: 'balance' },
        { time: '19:00', title: 'HIIT', instructor: 'Максим Левченко', type: 'cardio', highlight: true }
      ]
    },
    {
      day: '20', name: 'Вівторок', classes: [
        { time: '07:30', title: 'Йога', instructor: 'Олена Савчук', type: 'balance' },
        { time: '12:00', title: 'TRX', instructor: 'Андрій Бондар', type: 'power' },
        { time: '18:30', title: 'Cycle', instructor: 'Максим Левченко', type: 'cardio' }
      ]
    },
    {
      day: '21', name: 'Середа', classes: [
        { time: '08:00', title: 'Силове', instructor: 'Андрій Бондар', type: 'power' },
        { time: '13:00', title: 'Stretching', instructor: 'Марія Коваль', type: 'balance' },
        { time: '19:00', title: 'Functional', instructor: 'Максим Левченко', type: 'power' }
      ]
    },
    {
      day: '22', name: 'Четвер', classes: [
        { time: '07:30', title: 'Пілатес', instructor: 'Марія Коваль', type: 'balance' },
        { time: '12:00', title: 'Boxing', instructor: 'Максим Левченко', type: 'cardio' },
        { time: '18:30', title: 'Йога', instructor: 'Олена Савчук', type: 'balance' }
      ]
    },
    {
      day: '23', name: 'П\'ятниця', classes: [
        { time: '08:00', title: 'TRX', instructor: 'Андрій Бондар', type: 'power' },
        { time: '13:00', title: 'Pilates', instructor: 'Марія Коваль', type: 'balance' },
        { time: '19:00', title: 'HIIT', instructor: 'Максим Левченко', type: 'cardio' }
      ]
    },
    {
      day: '24', name: 'Субота', classes: [
        { time: '09:00', title: 'Йога', instructor: 'Олена Савчук', type: 'balance' },
        { time: '11:00', title: 'Functional', instructor: 'Андрій Бондар', type: 'power' },
        { time: '16:00', title: 'Stretching', instructor: 'Марія Коваль', type: 'balance' }
      ]
    },
    {
      day: '25', name: 'Неділя', classes: [
        { time: '09:00', title: 'Пілатес', instructor: 'Марія Коваль', type: 'balance' },
        { time: '11:00', title: 'Cycle', instructor: 'Максим Левченко', type: 'cardio' },
        { time: '16:00', title: 'Йога', instructor: 'Олена Савчук', type: 'balance' }
      ]
    }
  ];

  const scheduleGrid = document.getElementById('scheduleGrid');

  function renderSchedule(filter = 'all') {
    if (!scheduleGrid) return;
    scheduleGrid.innerHTML = '';

    scheduleData.forEach(dayCol => {
      const colEl = document.createElement('div');
      colEl.className = 'day-column';

      const headerEl = document.createElement('div');
      headerEl.className = 'day-column-header';
      headerEl.innerHTML = `${dayCol.day} <br><small style="color:var(--text-muted);font-weight:400">${dayCol.name}</small>`;
      colEl.appendChild(headerEl);

      dayCol.classes.forEach(s => {
        if (filter !== 'all' && s.type !== filter) return;

        const sessionEl = document.createElement('div');
        sessionEl.className = `session-card ${s.highlight ? 'highlight-card' : ''}`;
        sessionEl.setAttribute('data-title', `${s.title} (${dayCol.day} жовтня, ${s.time})`);
        sessionEl.innerHTML = `
          <div class="s-time">${s.time}</div>
          <div class="s-title">${s.title}</div>
          <div class="s-instructor">${s.instructor}</div>
        `;

        sessionEl.addEventListener('click', () => {
          openModal(`Запис на ${s.title} (${s.time})`);
        });

        colEl.appendChild(sessionEl);
      });

      scheduleGrid.appendChild(colEl);
    });
  }

  renderSchedule();

  // Фільтри напрямків у розкладі
  const scheduleFilterBtns = document.querySelectorAll('.schedule-section .tab-btn');
  scheduleFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSchedule(btn.dataset.filter);
    });
  });

  // 6. Перемикач цін (1 місяць / 3 місяці)
  const pricingToggle = document.getElementById('pricingToggle');
  const priceElements = document.querySelectorAll('.card-price');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
      const is3Months = e.target.checked;
      priceElements.forEach(el => {
        const valSpan = el.querySelector('.val');
        if (is3Months) {
          valSpan.textContent = el.dataset.m3;
        } else {
          valSpan.textContent = el.dataset.m1;
        }
      });
    });
  }

  // 7. Модальне вікно (для швидкого запису з розкладу)
  const bookingModal = document.getElementById('bookingModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');

  function openModal(title) {
    if (modalTitle) modalTitle.textContent = title;
    if (bookingModal) bookingModal.classList.add('active');
  }

  function closeModal() {
    if (bookingModal) bookingModal.classList.remove('active');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // 8. Обробка форм
  const trialForm = document.getElementById('trialForm');
  const modalForm = document.getElementById('modalForm');
  const mainBookingForm = document.getElementById('mainBookingForm');

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Дякуємо! Ми зателефонуємо вам для підтвердження першого тренування.');
      trialForm.reset();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Вашу заявку успішно відправлено!');
      modalForm.reset();
      closeModal();
    });
  }

  if (mainBookingForm) {
    mainBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Дякуємо! Вашу заявку на тренування прийнято. Ми зателефонуємо вам для підтвердження.');
      mainBookingForm.reset();
    });
  }

  // 9. Кнопка прокрутки вгору
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 10. Фільтрація Галереї
  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-gallery-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 11. Lightbox (Перегляд фото в галереї)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = caption ? caption.textContent : '';
          lightbox.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

});