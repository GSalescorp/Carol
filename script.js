document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const firstSection = document.querySelector('section');
    
    if (!header || !firstSection) {
        console.error('Header ou primeira seção não encontrados');
        return;
    }

    let isMouseOverHeader = false;
    let ticking = false;
    let lastScrollPosition = window.scrollY;
    let firstSectionBottom;

    function handleHeader() {
        const scrollPosition = window.scrollY;
        
        if (firstSectionBottom === undefined) {
            firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
        }

        if (scrollPosition < firstSectionBottom) {
            header.style.transform = 'translateY(0)';
        } else if (isMouseOverHeader) {
            header.style.transform = 'translateY(0)';
        } else if (scrollPosition > lastScrollPosition) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollPosition = scrollPosition;
        ticking = false;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener('scroll', debounce(function() {
        if (!ticking) {
            window.requestAnimationFrame(handleHeader);
            ticking = true;
        }
    }, 10));

    header.addEventListener('mouseenter', function() {
        isMouseOverHeader = true;
        handleHeader();
    });

    header.addEventListener('mouseleave', function() {
        isMouseOverHeader = false;
        handleHeader();
    });

    // Chamada inicial para definir o estado correto do header
    handleHeader();
});