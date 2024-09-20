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
});
