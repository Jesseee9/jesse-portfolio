document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal elements on scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a grid item (like service cards), stagger the children
                if (entry.target.classList.contains('services-grid')) {
                    const items = entry.target.querySelectorAll('.reveal-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 150);
                    });
                }
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections and special grids
    document.querySelectorAll('.reveal, .services-grid').forEach(el => {
        revealObserver.observe(el);
    });

    // Special handling for individual reveal items if not in a grid
    document.querySelectorAll('.reveal-item').forEach(el => {
        if (!el.closest('.services-grid')) {
            revealObserver.observe(el);
        }
    });

    // Trigger hero animation immediately
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
