<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Animação suave de rolagem para o botão de inscrição
    const inscrevaSeBtn = document.querySelector('.btn');
    inscrevaSeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const benefitsSection = document.querySelector('.benefits');
        benefitsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Adiciona classe 'visible' aos benefícios conforme são rolados para a visualização
    const benefits = document.querySelectorAll('.benefit');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    benefits.forEach(benefit => {
        observer.observe(benefit);
    });

    // Adiciona efeito de parallax na seção hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Adiciona classe 'visible' aos diferenciais conforme são rolados para a visualização
    const diferenciais = document.querySelectorAll('.diferencial');
    const diferencialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    diferenciais.forEach(diferencial => {
        diferencialObserver.observe(diferencial);
    });

    // Adiciona classe 'visible' aos KPIs conforme são rolados para a visualização
    const kpis = document.querySelectorAll('.kpi');
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.querySelector('canvas')) {
                    createChart(entry.target.querySelector('canvas'));
                }
            }
        });
    }, { threshold: 0.5 });

    kpis.forEach(kpi => {
        kpiObserver.observe(kpi);
    });

    // Função para criar gráficos
    function createChart(canvas) {
        const ctx = canvas.getContext('2d');
        let chart;

        switch(canvas.id) {
            case 'engagementChart':
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        datasets: [{
                            label: 'Engajamento',
                            data: [10, 25, 45, 60, 75, 90],
                            borderColor: '#BE0404',
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        animation: {
                            duration: 2000,
                            easing: 'easeOutQuart'
                        }
                    }
                });
                break;
            case 'conversionChart':
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Antes', 'Depois'],
                        datasets: [{
                            label: 'Taxa de Conversão',
                            data: [2, 8],
                            backgroundColor: ['#333', '#BE0404']
                        }]
                    },
                    options: {
                        responsive: true,
                        animation: {
                            duration: 2000,
                            easing: 'easeOutQuart'
                        }
                    }
                });
                break;
            case 'roiChart':
                chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Investimento', 'Retorno'],
                        datasets: [{
                            data: [30, 70],
                            backgroundColor: ['#333', '#BE0404']
                        }]
                    },
                    options: {
                        responsive: true,
                        animation: {
                            duration: 2000,
                            easing: 'easeOutQuart'
                        }
                    }
                });
                break;
        }
    }

    // Adiciona efeito de parallax suave em todas as seções
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        sections.forEach((section, index) => {
            const yPos = -(scrollPosition * 0.1 * (index + 1));
            section.style.backgroundPositionY = yPos + 'px';
        });
    });

    // Funcionalidade atualizada do slider de depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (index + 1) % testimonials.length;

        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active', 'prev', 'next');
            if (i === index) {
                testimonial.classList.add('active');
            } else if (i === prevIndex) {
                testimonial.classList.add('prev');
            } else if (i === nextIndex) {
                testimonial.classList.add('next');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Iniciar a transição automática
    setInterval(nextTestimonial, 5000);

    // Mostrar o primeiro depoimento inicialmente
    showTestimonial(currentTestimonial);

    // Adiciona classe 'visible' aos depoimentos conforme são rolados para a visualização
    const testimonialSection = document.querySelector('.testimonials');
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    testimonialObserver.observe(testimonialSection);
});
=======
