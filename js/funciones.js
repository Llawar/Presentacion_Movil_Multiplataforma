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


/* ========================================
   🖥️ FUNCIÓN PANTALLA COMPLETA
   ======================================== */
const btnFullscreen = document.getElementById('btn-fullscreen');

// ⚠️ IMPORTANTE: Seleccionar el wrapper que contiene TODO (main + nav)
const appWrapper = document.getElementById('app-wrapper');

// Verificar que el elemento existe antes de continuar
if (btnFullscreen && appWrapper) {
    const iconEnter = btnFullscreen.querySelector('.icon-enter');
    const iconExit = btnFullscreen.querySelector('.icon-exit');

    function toggleFullscreen() {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            
            // ENTRAR en fullscreen
            if (appWrapper.requestFullscreen) {
                appWrapper.requestFullscreen();
            } else if (appWrapper.webkitRequestFullscreen) {
                appWrapper.webkitRequestFullscreen();
            } else if (appWrapper.mozRequestFullScreen) {
                appWrapper.mozRequestFullScreen();
            } else if (appWrapper.msRequestFullscreen) {
                appWrapper.msRequestFullscreen();
            }
        } else {
            // SALIR de fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function updateFullscreenIcon() {
        if (!iconEnter || !iconExit) return;
        
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            iconEnter.style.display = 'none';
            iconExit.style.display = 'inline';
        } else {
            iconEnter.style.display = 'inline';
            iconExit.style.display = 'none';
        }
    }

    // Event Listeners
    btnFullscreen.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('msfullscreenchange', updateFullscreenIcon);

    // Atajo de teclado: Tecla "F"
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'f' && 
            !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            toggleFullscreen();
        }
    });

    // Inicializar icono al cargar
    updateFullscreenIcon();
} else {
    console.warn('⚠️ Elementos de fullscreen no encontrados. Verifica que existan #app-wrapper y #btn-fullscreen en el HTML.');
}