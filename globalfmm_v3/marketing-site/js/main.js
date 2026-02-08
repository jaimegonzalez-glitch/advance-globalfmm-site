document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.glass-nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero-content, .hero-visual, .feature-card').forEach(el => {
        observer.observe(el);
    });

    // Cookie Consent Logic
    const initCookieBanner = () => {
        if (localStorage.getItem('cookies-accepted')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner glass';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-icon">🍪</div>
                <div class="cookie-text">
                    <h4>Respetamos tu privacidad</h4>
                    <p>Utilizamos cookies para optimizar tu experiencia en el ecosistema Advance. Al continuar navegando, aceptas nuestra <a href="politica-cookies.html">Política de Cookies</a> y <a href="politica-privacidad.html">Privacidad</a>.</p>
                </div>
            </div>
            <div class="cookie-actions">
                <button class="btn-cookie-minimal" id="btn-cookies-minimal">Esenciales solo</button>
                <button class="btn-cookie-accept" id="btn-cookies-accept">Aceptar todas</button>
            </div>
        `;

        document.body.appendChild(banner);

        // Show with delay
        setTimeout(() => banner.classList.add('show'), 1500);

        const acceptBtn = document.getElementById('btn-cookies-accept');
        const minimalBtn = document.getElementById('btn-cookies-minimal');

        const closeBanner = () => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 600);
            localStorage.setItem('cookies-accepted', 'true');
        };

        acceptBtn.addEventListener('click', closeBanner);
        minimalBtn.addEventListener('click', closeBanner);
    };

    initCookieBanner();
});
