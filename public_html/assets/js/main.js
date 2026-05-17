/* main.js — blueenergie.fr */

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.dataset.smoothBound === '1') return;
        anchor.dataset.smoothBound = '1';
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function setupNavbar() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.navbar ul');
    if (!menuButton || !navMenu) return false;
    if (menuButton.dataset.bound === '1') return true;
    menuButton.dataset.bound = '1';

    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuButton.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuButton.textContent = '☰';
        });
    });

    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
            navMenu.classList.remove('active');
            menuButton.textContent = '☰';
        }
    });

    return true;
}

function setupForms() {
    const dpeRadios = document.querySelectorAll('input[name="dpe"]');
    const dpeFileUpload = document.getElementById('dpeFileUpload');
    if (dpeFileUpload) {
        dpeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                dpeFileUpload.style.display = this.value === 'oui' ? 'block' : 'none';
            });
        });
    }

    document.querySelectorAll('form').forEach(form => {
        if (form.dataset.bound === '1') return;
        form.dataset.bound = '1';
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, { method: 'POST', body: formData })
                .then(r => {
                    if (r.ok) {
                        alert('Message envoyé avec succès!');
                        form.reset();
                    } else {
                        throw new Error('Erreur lors de l\'envoi');
                    }
                })
                .catch(err => {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                    console.error('Error:', err);
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScroll();
    setupNavbar();
    setupForms();
});

// Re-bind after async partials injection (Session 11)
document.addEventListener('partialsReady', function() {
    setupSmoothScroll();
    setupNavbar();
});
