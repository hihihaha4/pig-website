document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен! Начинаем инициализацию...');
    
    try {
        // Код для слайдера
        const track = document.querySelector('.slider-track');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        console.log('Элементы слайдера:', { track, prevBtn, nextBtn });
        
        if (track && prevBtn && nextBtn) {
            let currentSlide = 0;
            const slidesToShow = 3;
            const slideWidth = 100 / slidesToShow;

            nextBtn.addEventListener('click', function() {
                if (currentSlide < 17 - slidesToShow) {
                    currentSlide++;
                    updateSlider();
                }
            });

            prevBtn.addEventListener('click', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            function updateSlider() {
                track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
                console.log('Слайд изменен:', currentSlide);
            }
            
            console.log('Слайдер инициализирован');
        } else {
            console.warn('Не все элементы слайдера найдены');
        }

        // Код для модального окна с увеличенным фото
        const slides = document.querySelectorAll('.slide img');
        console.log('Найдено изображений:', slides.length);
        
        if (slides.length > 0) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="close-modal">&times;</span>
                <img class="modal-content" src="" alt="Увеличенное фото">
            `;
            document.body.appendChild(modal);
            
            const modalImg = modal.querySelector('.modal-content');
            const closeBtn = modal.querySelector('.close-modal');
            
            slides.forEach((slide, index) => {
                slide.addEventListener('click', function() {
                    modalImg.src = this.src;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    console.log('Открыто изображение:', index);
                });
            });
            
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Закрытие по ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            console.log('Модальное окно инициализировано');
        }

        // Код для скрывающегося хедера
        const header = document.querySelector('header');
        console.log('Хедер найден:', header);
        
        if (header) {
            let lastScrollY = window.scrollY;

            window.addEventListener('scroll', () => {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    // Скроллим вниз - прячем хедер
                    header.classList.add('hidden');
                } else {
                    // Скроллим вверх - показываем хедер
                    header.classList.remove('hidden');
                }
                lastScrollY = window.scrollY;
            });
            
            console.log('Скрывающийся хедер инициализирован');
        }

        console.log('Все скрипты успешно загружены!');
        
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
});

// Добавляем обработчик ошибок для изображений
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Ошибка загрузки изображения:', e.target.src);
        e.target.style.display = 'none';
    }
}, true);