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

        // 1. Detectar si estamos en la última diapositiva (la nueva Slide 14)
        const isFinale = currentIndex === totalSlides - 1;
        
        // 2. Ejecutar la lógica especial (animaciones Star Wars)
        handleFinaleSlide(isFinale);
        
        // 3. Asegurar que el botón "Siguiente" se deshabilite en el final
        btnNext.disabled = isFinale; 
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


/* ========================================
   🌟 LÓGICA PARA SLIDE FINAL (STAR WARS)
   ======================================== */

// Referencias
const slide14 = document.getElementById('slide-14');
const btnRestart = document.getElementById('btn-restart');

// Función para activar animaciones solo cuando el slide 14 es visible
function handleFinaleSlide(isActive) {
    if (!slide14) return;
    
    const crawl = document.getElementById('sw-crawl-text');
    const letters = slide14.querySelectorAll('.sw-letter');
    
    if (isActive) {
        // Reiniciar animaciones al entrar al slide final
        if (crawl) {
            crawl.style.animation = 'none';
            crawl.offsetHeight; // Trigger reflow
            crawl.style.animation = 'sw-crawl-up 25s linear forwards';
            crawl.style.animationDelay = '2s';
        }
        
        // Reiniciar letras del logo
        letters.forEach((letter, index) => {
            letter.style.animation = 'none';
            letter.offsetHeight; // Trigger reflow
            letter.style.animation = `sw-letter-pop 0.4s ease-out forwards`;
            letter.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Ocultar controles principales y mostrar los minimalistas
        document.querySelector('.controls')?.style.setProperty('display', 'none', 'important');
    } else {
        // Restaurar controles al salir
        document.querySelector('.controls')?.style.setProperty('display', 'flex', 'important');
    }
}

// Modificar updateSlides() para detectar el slide final
// (Busca tu función updateSlides existente y agrega esto al final):
/*
function updateSlides() {
    // ... tu código existente ...
    
    // === AGREGAR ESTO AL FINAL DE updateSlides() ===
    const isFinale = currentIndex === slides.length - 1;
    handleFinaleSlide(isFinale);
    
    // Deshabilitar "Siguiente" en el último slide
    btnNext.disabled = isFinale;
}
*/

// Botón de reiniciar presentación
if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        // Reiniciar al slide 1
        currentIndex = 0;
        updateSlides();
        
        // Si está en fullscreen, salir primero
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        
        // Scroll suave al top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Permitir volver atrás con flecha izquierda incluso en el slide final
// (Esto ya debería funcionar con tu código actual de prevSlide)

// Bonus: Efecto de partículas al finalizar (opcional)
function createConfetti() {
    if (!slide14 || !slide14.classList.contains('active')) return;
    
    const colors = [varCSS('--primary'), varCSS('--secondary'), varCSS('--accent'), '#fff'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: -10px;
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        `;
        document.body.appendChild(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => particle.remove(), 5000);
    }
}

// Helper para obtener variables CSS
function varCSS(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Agregar keyframes para confeti dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lanzar confeti cuando se llega al slide final por primera vez
let finaleShown = false;
const originalUpdateSlides = updateSlides;
updateSlides = function() {
    originalUpdateSlides();
    
    if (currentIndex === slides.length - 1 && !finaleShown) {
        finaleShown = true;
        setTimeout(createConfetti, 3000); // Confeti después de 3 segundos
    }
};