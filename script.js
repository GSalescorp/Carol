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
    if (splineViewer) {
        splineViewer.addEventListener('load', function() {
            console.log('Spline carregado com sucesso');
        });
        splineViewer.addEventListener('error', function(error) {
            console.error('Erro ao carregar o Spline:', error);
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
});