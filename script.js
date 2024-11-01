// script.js

document.addEventListener('DOMContentLoaded', function() {
    const nextSection = document.querySelector('#strawberry');
    const homeLogo = document.querySelector('.navbar-brand'); // Logo na navbar
    const homeLink = document.querySelector('.navbar .nav-link[href="#home"]'); // Link "Home" na navbar
    let homeRemoved = false;

    const originalHomeHTML = document.querySelector('#home').outerHTML;

    function startAnimation() {
        if (homeRemoved) return;

        const homeSection = document.querySelector('#home');
        const donutLogoImg = homeSection.querySelector('.donutLogoImg');
        const brandName = homeSection.querySelector('.brandName');
        const nameBrand = homeSection.querySelector('.nameBrand');

        donutLogoImg.classList.add('fly-away-left');
        brandName.classList.add('fly-away-right');
        nameBrand.classList.add('fly-away-up');

        setTimeout(() => {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                homeSection.remove();
                homeRemoved = true;
            }, 500);
        }, 500);
    }

    function restoreHomeSection() {
        if (homeRemoved) {
            document.body.insertAdjacentHTML('afterbegin', originalHomeHTML);

            const newButton = document.querySelector('.homeButton');
            newButton.addEventListener('click', (event) => {
                event.preventDefault();
                startAnimation();
            });

            const newHomeSection = document.querySelector('#home');
            newHomeSection.scrollIntoView({ behavior: 'smooth' });

            homeRemoved = false;
        }
    }

    homeLogo.addEventListener('click', (event) => {
        event.preventDefault();
        restoreHomeSection();
    });

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        restoreHomeSection();
    });

    const button = document.querySelector('.homeButton');
    button.addEventListener('click', (event) => {
        event.preventDefault();
        startAnimation();
    });
});
