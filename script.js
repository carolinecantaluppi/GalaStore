//inserendo scroll in navbar:
document.addEventListener('scroll', () => {
	let scrolled = window.scrollY;
	if(scrolled >= 20){
        // quando scrolla, rimuove il colore iniziale della navbar:
        navbarId.classList.remove('bg-light', 'navbar-light');
        // quando scrolla, aggiunge il colore transparente nella navbar: 
        navbarId.classList.add('bg-transparent');
        // quando scrolla, ingrandisce la navbar aumentando l’altezza in 150px:
		navbarId.style.height = '50px';
	} else {
        navbarId.classList.remove('bg-transparent');
        navbarId.classList.add('bg-light', 'navbar-light');
		navbarId.style.height = '50px';
	}
})
