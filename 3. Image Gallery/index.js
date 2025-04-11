document.querySelectorAll('.thumbnail').forEach(image => {
    image.addEventListener('click', function() {
        document.getElementById('lightbox-img').src = this.src;
        document.getElementById('lightbox').classList.add('show');
    });
});

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('lightbox').classList.remove('show');
});