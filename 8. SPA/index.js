const routes = ['home', 'about', 'services', 'contact'];
let currentRoute = '';

function renderView() {
    const hash = location.hash.slice(1) || 'home';
    
    if (currentRoute === hash) return;
    currentRoute = hash;
    
    routes.forEach(route => {
        const view = document.getElementById(route);
        const link = document.getElementById(`${route}-link`);
        
        if (route === hash) {
            view.classList.add('active');
            link.classList.add('active');
        } else {
            view.classList.remove('active');
            link.classList.remove('active');
        }
    });
    
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderView);

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    alert(`Thanks ${name}! Your message has been received. We'll contact you at ${email} soon.`);
    
    this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    renderView();
});