        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            const menuButton = document.querySelector('.mobile-menu-button');
            const navMenu = document.querySelector('.navbar ul');
            const navLinks = document.querySelectorAll('.navbar ul a');

            // Toggle menu
            menuButton.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                menuButton.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    menuButton.textContent = '☰';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuButton.textContent = '☰';
                }
            });

            const dpeRadios = document.querySelectorAll('input[name="dpe"]');
            const dpeFileUpload = document.getElementById('dpeFileUpload');
            
            dpeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    dpeFileUpload.style.display = this.value === 'oui' ? 'block' : 'none';
                });
            });

            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    fetch(form.action, {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => {
                        if (response.ok) {
                            alert('Message envoyé avec succès!');
                            form.reset();
                        } else {
                            throw new Error('Erreur lors de l\'envoi');
                        }
                    })
                    .catch(error => {
                        alert('Une erreur est survenue. Veuillez réessayer.');
                        console.error('Error:', error);
                    });
                });
            });
        });
