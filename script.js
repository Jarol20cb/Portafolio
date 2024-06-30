document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.querySelector('body');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    body.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    function animateSkillBar(skillBar) {
        const skillLevel = skillBar.querySelector('.skill-level');
        const targetSkill = parseInt(skillBar.getAttribute('data-skill'), 10);
        let currentSkill = 0;

        const interval = setInterval(() => {
            if (currentSkill >= targetSkill) {
                clearInterval(interval);
            } else {
                currentSkill++;
                skillLevel.textContent = currentSkill + '%';
                skillBar.style.setProperty('--skill-percentage', `${currentSkill}%`);
            }
        }, 10);

        skillBar.classList.add('load');
    }

    function checkSkillBars() {
        skillBars.forEach(skillBar => {
            const rect = skillBar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !skillBar.classList.contains('loaded')) {
                animateSkillBar(skillBar);
                skillBar.classList.add('loaded');
            }
        });
    }

    window.addEventListener('scroll', checkSkillBars);
    checkSkillBars();

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
            nav.classList.remove('active'); // Cierra el menú después de hacer clic
            menuToggle.classList.remove('active'); // Cambia el ícono de vuelta
        });
    });
});
