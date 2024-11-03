document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.querySelector('#home');
    const nextSection = document.querySelector('#strawberry');
    const homeLogo = document.querySelector('.navbar-brand');
    const homeLink = document.querySelector('.navbar .nav-link[href="#home"]');
    const homeButton = document.querySelector('.homeButton');
    let homeHidden = false;

    function startAnimation() {
        if (homeHidden) return;

        const donutLogoImg = homeSection.querySelector('.donutLogoImg');
        const brandName = homeSection.querySelector('.brandName');
        const nameBrand = homeSection.querySelector('.nameBrand');

        donutLogoImg.classList.add('fly-away-left');
        brandName.classList.add('fly-away-right');
        nameBrand.classList.add('fly-away-up');

        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            homeSection.classList.add('hidden');
            homeHidden = true;

            donutLogoImg.classList.remove('fly-away-left');
            brandName.classList.remove('fly-away-right');
            nameBrand.classList.remove('fly-away-up');
        }, 530);
    }

    function restoreHomeSection() {
        if (homeHidden) {
            homeSection.classList.remove('hidden');
            homeHidden = false;

            homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    homeButton.addEventListener('click', (event) => {
        event.preventDefault();
        startAnimation();
    });
});
