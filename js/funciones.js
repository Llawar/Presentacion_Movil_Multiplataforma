document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const counterDisplay = document.getElementById('slide-counter');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index < currentIndex) {
                slide.classList.add('prev');
            }
        });

        counterDisplay.textContent = `${currentIndex + 1} / ${totalSlides}`;

        // Manejo de botones
        btnPrev.disabled = currentIndex === 0;
        btnNext.disabled = currentIndex === totalSlides - 1;
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlides();
        }
    }

    // Event Listeners
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Inicializar
    updateSlides();
});