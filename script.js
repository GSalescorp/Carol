document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const firstSection = document.querySelector('section');
    const topLine = document.querySelector('.top-line');
    
    if (!header || !firstSection || !topLine) {
        console.error('Elementos essenciais não encontrados');
        return;
    }

    let isMouseOverHeader = false;
    let headerTimeout;
    let lastScrollPosition = window.scrollY;
    let firstSectionBottom;

    function showHeader() {
        header.style.top = '0';
        clearTimeout(headerTimeout);
        headerTimeout = setTimeout(hideHeader, 5000);
    }

    function hideHeader() {
        if (!isMouseOverHeader) {
            header.style.top = '-100%';
        }
    }

    function updateTopLine() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        topLine.style.width = scrollPercentage + '%';
    }

    function handleScroll() {
        updateTopLine();
        const scrollPosition = window.scrollY;
        
        if (firstSectionBottom === undefined) {
            firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
        }

        if (scrollPosition < firstSectionBottom) {
            showHeader();
        } else if (scrollPosition > lastScrollPosition) {
            showHeader();
        }

        lastScrollPosition = scrollPosition;
    }

    window.addEventListener('scroll', handleScroll);

    header.addEventListener('mouseenter', function() {
        isMouseOverHeader = true;
        showHeader();
    });

    header.addEventListener('mouseleave', function() {
        isMouseOverHeader = false;
        hideHeader();
    });

    showHeader();

    // Verificar o carregamento do Spline
    const splineViewer = document.querySelector('spline-viewer');
    const splineLoader = document.getElementById('spline-loader');

    if (splineViewer && splineLoader) {
        splineViewer.addEventListener('load', function() {
            console.log('Spline carregado com sucesso');
            splineLoader.style.display = 'none';
        });

        splineViewer.addEventListener('error', function(error) {
            console.error('Erro ao carregar o Spline:', error);
            splineLoader.textContent = 'Erro ao carregar o modelo 3D';
        });
    }

    // Botão de voltar ao topo
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '&#9650;'; // Seta para cima
    document.body.appendChild(scrollToTopBtn);

    function toggleScrollToTopBtn() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chamadas iniciais
    updateTopLine();
    toggleScrollToTopBtn();

    // Animação dos números de resultados
    function animateNumbers() {
        const resultNumbers = document.querySelectorAll('.result-number');
        
        resultNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2000; // Duração total da animação em milissegundos
            let startTime;

            const easeOutQuart = t => 1 - (--t) * t * t * t; // Função de easing para uma animação mais suave

            const updateNumber = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuart(progress);

                let current = Math.floor(easedProgress * target);
                
                if (target >= 1000000) {
                    if (current < 1000) {
                        number.textContent = current;
                    } else if (current < 1000000) {
                        number.textContent = (current / 1000).toFixed(1) + 'K';
                    } else {
                        number.textContent = (current / 1000000).toFixed(2) + 'M';
                    }
                } else {
                    number.textContent = current;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target >= 1000000 ? '1M+' : target;
                }
            };

            requestAnimationFrame(updateNumber);
        });
    }

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Iniciar animação quando a seção de resultados estiver visível
    const resultsSection = document.getElementById('resultados');
    let animationStarted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                animateNumbers();
                animationStarted = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (resultsSection) {
        observer.observe(resultsSection);
    }

    // Carrossel de depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    let intervalId;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
                testimonial.classList.remove('prev', 'next');
            } else if (i === (index - 1 + testimonials.length) % testimonials.length) {
                testimonial.classList.add('prev');
                testimonial.classList.remove('active', 'next');
            } else if (i === (index + 1) % testimonials.length) {
                testimonial.classList.add('next');
                testimonial.classList.remove('active', 'prev');
            } else {
                testimonial.classList.remove('active', 'prev', 'next');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startCarousel() {
        intervalId = setInterval(nextTestimonial, 5000);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopCarousel();
        startCarousel();
    });

    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopCarousel();
        startCarousel();
    });

    // Inicializar o carrossel
    showTestimonial(currentTestimonial);
    startCarousel();

    // Manipulador de envio do formulário
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(response => {
            // O Google Forms não retorna uma resposta que podemos processar,
            // então assumimos que foi bem-sucedido se chegamos aqui
            alert('Formulário enviado com sucesso!');
            form.reset();
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        });
    });
});