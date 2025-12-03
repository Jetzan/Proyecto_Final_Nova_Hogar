const items = document.querySelectorAll('.ask__item');

items.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});