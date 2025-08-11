document.addEventListener("DOMContentLoaded", () => {
    // Конфігурація Firebase 
    // ЗАМІНІТЬ ЦІ ЗНАЧЕННЯ НА ВАШІ ВЛАСНІ ДАНІ З КОНСОЛІ FIREBASE
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Ініціалізація Firebase
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (e) {
            console.error("Firebase initialization error:", e);
        }
    }
    const db = firebase.firestore();

    // Функція для підрахунку переглядів
    const incrementViewCount = () => {
        if (!db) return;
        const pageId = window.location.pathname.replace(/[^a-z0-9]/gi, '_') || 'home';
        const pageViewsRef = db.collection('page_views').doc(pageId);

        db.runTransaction((transaction) => {
            return transaction.get(pageViewsRef).then((doc) => {
                let newCount = 1;
                if (doc.exists) {
                    newCount = doc.data().count + 1;
                }
                transaction.set(pageViewsRef, { count: newCount });
                return newCount;
            });
        }).then((newCount) => {
            const counterElement = document.getElementById('view-counter');
            const counterContainer = document.getElementById('view-counter-container');
            if(counterElement && counterContainer) {
                counterElement.textContent = newCount;
                counterContainer.style.display = 'inline';
            }
        }).catch((error) => {
            console.error("Помилка транзакції Firebase: ", error);
        });
    };
    
    incrementViewCount();

    // Об'єкт для перекладів
    const translations = {
        'uk': {
            'home': 'Головна',
            'members': 'Учасники',
            'gallery': 'Галерея',
            'music': 'Музика',
            'contacts': 'Контакти',
            'hero-title-home': 'Вас вітає JORS Метал Гурт!',
            'hero-subtitle-home': 'Пориньте у світ музики разом із нами.',
            'members-title': 'Учасники гурту',
            'members-subtitle': 'Познайомтесь з нашими талановитими учасниками!',
            'gallery-title': 'Галерея',
            'gallery-subtitle': 'Дивіться фотографії та моменти гурту JORS!',
            'music-title': 'Музика',
            'music-subtitle': 'Скоро виходить альбом HOPEKILLER!',
            'album-announcement': 'Скоро виходить альбом HOPEKILLER!',
            'countdown-days': 'Дні',
            'countdown-hours': 'Години',
            'countdown-minutes': 'Хвилини',
            'countdown-seconds': 'Секунди',
            'contacts-title': 'Контакти',
            'contacts-email': 'Електронна пошта',
            'instagram-title': 'Instagram',
            'instagram-group': 'Група',
            'instagram-david': 'Давид',
            'instagram-oleksandr': 'Олександр',
            'instagram-yaroslav': 'Ярослав',
            'privacy-title': 'Політика конфіденційності',
            'privacy-subtitle': 'Ми піклуємося про вашу приватність та збереження ваших даних.',
            'privacy-heading1': 'Збір і використання даних',
            'privacy-p1': 'Ми збираємо лише ті дані, які необхідні для забезпечення якісного обслуговування, наприклад, ваші контактні дані, коли ви зв\'язуєтесь з нами.',
            'privacy-heading2': 'Захист даних',
            'privacy-p2': 'Усі ваші дані зберігаються безпечно та не передаються третім сторонам без вашої згоди.',
            'privacy-heading3': 'Ваші права',
            'privacy-p3': 'Ви маєте право дізнатися, які дані ми зберігаємо, виправити їх або вимагати їх видалення. Для цього зв\'яжіться з нами за електронною адресою',
            'privacy-heading4': 'Зміни в політиці',
            'privacy-p4': 'Ми можемо оновлювати цю політику конфіденційності. Усі зміни будуть публікуватися на цій сторінці.',
            'footer-text': '&copy; 2025 Гурт JORS. Всі права захищено. | <a href="privacy.html">Політика конфіденційності</a>',
            'band-member-oleksandr': 'Олександр',
            'band-member-david': 'Давид',
            'band-member-yaroslav': 'Ярослав',
            'band-info-oleksandr': 'Олександр — ритм-гітарист, співзасновник гурту. Його рифи створюють міцний фундамент для нашого звучання.',
            'band-info-david': 'Давид — соло-гітарист та один із засновників. Його віртуозні соло прорізають простір, даруючи незабутні емоції.',
            'band-info-yaroslav': 'Ярослав — наш потужний барабанщик. Його енергійні ритми тримають увесь гурт і заряджають публіку.',
            'events-title': 'Найближчі заходи',
            'event1-title': 'Стадіон Ювілейний',
            'event1-date': '12.08.2025 о 17:00',
            'event1-entry': 'Вхід безкоштовний',
            'event2-title': 'BunkerPub',
            'event2-date': '15.08.2025',
            'event2-entry': 'Потрібна бронь',
            'views': 'Переглядів'
        },
        'en': {
            'home': 'Home',
            'members': 'Members',
            'gallery': 'Gallery',
            'music': 'Music',
            'contacts': 'Contacts',
            'hero-title-home': 'Welcome to JORS Metal Band!',
            'hero-subtitle-home': 'Immerse yourself in the world of music with us.',
            'members-title': 'Band Members',
            'members-subtitle': 'Meet our talented members!',
            'gallery-title': 'Gallery',
            'gallery-subtitle': 'See photos and moments of the JORS band!',
            'music-title': 'Music',
            'music-subtitle': 'Album HOPEKILLER coming soon!',
            'album-announcement': 'Album HOPEKILLER coming soon!',
            'countdown-days': 'Days',
            'countdown-hours': 'Hours',
            'countdown-minutes': 'Minutes',
            'countdown-seconds': 'Seconds',
            'contacts-title': 'Contacts',
            'contacts-email': 'Email',
            'instagram-title': 'Instagram',
            'instagram-group': 'Group',
            'instagram-david': 'David',
            'instagram-oleksandr': 'Oleksandr',
            'instagram-yaroslav': 'Yaroslav',
            'privacy-title': 'Privacy Policy',
            'privacy-subtitle': 'We care about your privacy and data security.',
            'privacy-heading1': 'Data Collection and Use',
            'privacy-p1': 'We only collect data necessary to provide quality service, such as your contact information when you contact us.',
            'privacy-heading2': 'Data Protection',
            'privacy-p2': 'All your data is securely stored and not transferred to third parties without your consent.',
            'privacy-heading3': 'Your Rights',
            'privacy-p3': 'You have the right to know what data we store, correct it, or request its deletion. To do this, contact us by email at',
            'privacy-heading4': 'Changes to the Policy',
            'privacy-p4': 'We may update this privacy policy. All changes will be published on this page.',
            'footer-text': '&copy; 2025 JORS Band. All rights reserved. | <a href="privacy.html">Privacy Policy</a>',
            'band-member-oleksandr': 'Oleksandr',
            'band-member-david': 'David',
            'band-member-yaroslav': 'Yaroslav',
            'band-info-oleksandr': 'Oleksandr is the rhythm guitarist and co-founder. His riffs provide a solid foundation for our sound.',
            'band-info-david': 'David is the lead guitarist and one of the founders. His virtuosic solos cut through the air, delivering unforgettable emotions.',
            'band-info-yaroslav': 'Yaroslav is our powerful drummer. His energetic rhythms hold the whole band together and electrify the audience.',
            'events-title': 'Upcoming Events',
            'event1-title': 'Yuvileinyi Stadium',
            'event1-date': '12.08.2025 at 17:00',
            'event1-entry': 'Free admission',
            'event2-title': 'BunkerPub',
            'event2-date': '15.08.2025',
            'event2-entry': 'Reservation required',
            'views': 'Views'
        }
    };

    // Функція для встановлення мови
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'footer-text') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Оновлення заголовка сторінки
        const pageTitle = document.querySelector('title[data-key]');
        if (pageTitle) {
            const key = pageTitle.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                document.title = translations[lang][key];
            }
        }
    };

    // Ініціалізація мови
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLanguage(savedLang);

    // Перемикач мови
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
        langToggleBtn.textContent = savedLang.toUpperCase();
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'uk';
            const newLang = currentLang === 'uk' ? 'en' : 'uk';
            setLanguage(newLang);
            langToggleBtn.textContent = newLang.toUpperCase();
        });
    }

    // Мобільне меню (гамбургер)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });

        document.querySelectorAll('.navigation-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Логіка Слайдера Галереї
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const thumbnails = document.querySelectorAll('.thumbnail');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % slides.length;
            showSlide(newIndex);
        });

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                showSlide(parseInt(thumb.dataset.slide));
            });
        });

        // Ініціалізація Luminous Lightbox
        new LuminousGallery(document.querySelectorAll('.gallery-item'));
        
        showSlide(0);
    }

    // Логіка Акордеону для Учасників
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                const isActive = header.classList.contains('active');
                
                // Close all items
                document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
                document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);

                // Open the clicked one if it wasn't active
                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }


    // Логіка таймера зворотного відліку
    const countdownDate = new Date("Aug 15, 2025 00:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysSpan = document.getElementById("days");
        const hoursSpan = document.getElementById("hours");
        const minutesSpan = document.getElementById("minutes");
        const secondsSpan = document.getElementById("seconds");

        if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            const albumAnnouncement = document.querySelector('.album-announcement');
            if (albumAnnouncement) {
                albumAnnouncement.textContent = "Альбом HOPEKILLER вже вийшов!";
            }
            if (daysSpan) daysSpan.textContent = "00";
            if (hoursSpan) hoursSpan.textContent = "00";
            if (minutesSpan) minutesSpan.textContent = "00";
            if (secondsSpan) secondsSpan.textContent = "00";
        }
    };

    let countdownInterval;
    if (document.body.classList.contains('music-page')) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Логіка каруселі подій
    const eventSlides = document.querySelectorAll(".event-slide");
    if (eventSlides.length > 0) {
        let currentEventIndex = 0;
        const prevEventButton = document.querySelector(".prev-event-button");
        const nextEventButton = document.querySelector(".next-event-button");

        const showEventSlide = (index) => {
            eventSlides.forEach((slide, i) => {
                slide.classList.remove("active-slide");
                if (i === index) {
                    slide.classList.add("active-slide");
                }
            });
        };

        prevEventButton.addEventListener("click", () => {
            currentEventIndex = (currentEventIndex - 1 + eventSlides.length) % eventSlides.length;
            showEventSlide(currentEventIndex);
        });

        nextEventButton.addEventListener("click", () => {
            currentEventIndex = (currentEventIndex + 1) % eventSlides.length;
            showEventSlide(currentEventIndex);
        });

        showEventSlide(currentEventIndex);
    }
});
