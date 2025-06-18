document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    const particlesConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    // Inicializar partículas
    if (typeof particlesJS === 'function') {
        particlesJS('particles-js', particlesConfig);
    }

    // Efecto de sorpresa al hacer clic en el botón
    const surpriseBtn = document.getElementById('surpriseBtn');
    const confettiModal = new bootstrap.Modal(document.getElementById('confettiModal'));
    
    if (surpriseBtn && confettiModal) {
        surpriseBtn.addEventListener('click', function() {
            // Mostrar modal
            confettiModal.show();
            
            // Lanzar confeti
            launchConfetti();
            
            // Reproducir sonido (opcional)
            playCelebrationSound();
        });
    }
    
    // Efecto de escritura en el título
    const title = document.querySelector('h1');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
                // Añadir clase de animación después de terminar la escritura
                title.classList.add('animate-float');
            }
        }, 100);
    }
    
    // Efecto de scroll para las tarjetas
    const cards = document.querySelectorAll('.message-card');
    
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.5s ease ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
});

// Función para lanzar confeti
function launchConfetti() {
    if (typeof ConfettiGenerator !== 'function') return;
    
    const confettiSettings = { 
        target: 'particles-js',
        max: 150,
        size: 1.5,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [[255,215,0], [255,69,0], [30,144,255], [138,43,226], [255,192,203]],
        clock: 25,
        rotate: true,
        start_from_edge: true,
        respawn: true
    };
    
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    
    // Detener el confeti después de 5 segundos
    setTimeout(() => {
        confetti.clear();
    }, 5000);
}

// Función para reproducir sonido de celebración
function playCelebrationSound() {
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-celebration-464.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Reproducción automática no permitida:", e));
    } catch (e) {
        console.error("Error al cargar el audio:", e);
    }
}