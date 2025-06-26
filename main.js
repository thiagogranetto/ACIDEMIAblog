document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');

        if (loadingScreen && content) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
            content.style.opacity = '1';

            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }, 1000);

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    function openMenu() {
        document.body.classList.add('menu-open');
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
        }, 10);
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        setTimeout(() => {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
        }, 500); // igual ao duration-500
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', openMenu);
    }
    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', closeMenu);
    }

    // Fecha o menu ao clicar em qualquer link do menu mobile
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Portal navigation effect
    const navLinks = document.querySelectorAll('.nav-link');
    const portal = document.getElementById('portal');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('http')) {
                e.preventDefault();

                if (portal) {
                    portal.style.animation = 'portalOut 1.5s ease-in forwards';
                    portal.style.opacity = '1';

                    setTimeout(() => {
                        window.location.href = href;
                    }, 1000);
                } else {
                    window.location.href = href;
                }
            }
        });
    });

    // Check if we're arriving via portal animation
    if (portal && performance.getEntriesByType("navigation")[0].type === "navigate") {
    portal.style.animation = 'portalIn 1.5s ease-out forwards';
    portal.style.opacity = '1';

    setTimeout(() => {
        portal.style.opacity = '0';
        portal.style.pointerEvents = 'none';
        portal.style.display = 'none'; // Esconde o portal após a animação
    }, 1500);
    }

    // Carrossel de caixão
    const coffinImages = [
        'images/Acidemia 1.jpg',
        'images/Acidemia 2.jpg',
        'images/show1.jpg',
        'images/show4.jpg'
    ];
    let coffinIndex = 0;

    const coffinImageDiv = document.getElementById('coffin-image');
    const prevCoffin = document.getElementById('prev-coffin');
    const nextCoffin = document.getElementById('next-coffin');

    function updateCoffinImage() {
        if (coffinImageDiv) {
            const img = coffinImageDiv.querySelector('img');
            if (img) {
                img.classList.add('opacity-0', 'transition-opacity', 'duration-700');
                setTimeout(() => {
                    img.src = coffinImages[coffinIndex];
                    img.onload = () => {
                        img.classList.remove('opacity-0');
                    };
                }, 350);
            } else {
                coffinImageDiv.innerHTML = `<img src="${coffinImages[coffinIndex]}" alt="Imagem Carrossel" class="object-cover w-full h-full transition-opacity duration-700 opacity-0" />`;
                setTimeout(() => {
                    const newImg = coffinImageDiv.querySelector('img');
                    if (newImg) newImg.classList.remove('opacity-0');
                }, 50);
            }
        }
    }

    if (prevCoffin && nextCoffin) {
        prevCoffin.addEventListener('click', () => {
            coffinIndex = (coffinIndex - 1 + coffinImages.length) % coffinImages.length;
            updateCoffinImage();
        });
        nextCoffin.addEventListener('click', () => {
            coffinIndex = (coffinIndex + 1) % coffinImages.length;
            updateCoffinImage();
        });
    }

    // Troca automática a cada 5 segundos
setInterval(() => {
    coffinIndex = (coffinIndex + 1) % coffinImages.length;
    updateCoffinImage();
}, 5000);

    updateCoffinImage();
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrollPercent > 0.25) {
        nav.classList.add('opacity-0', 'pointer-events-none');
        nav.classList.remove('opacity-100');
    } else {
        nav.classList.remove('opacity-0', 'pointer-events-none');
        nav.classList.add('opacity-100');
    }
});

// Header hide on scroll past 30%
document.addEventListener('DOMContentLoaded', function () {
    const mobileHeader = document.getElementById('mobile-header');
    function handleHeader() {
        if (window.scrollY > window.innerHeight * 0.3) {
            mobileHeader.style.transform = 'translateY(-100%)';
        } else {
            mobileHeader.style.transform = 'translateY(0)';
        }
    }
    window.addEventListener('scroll', handleHeader);
});