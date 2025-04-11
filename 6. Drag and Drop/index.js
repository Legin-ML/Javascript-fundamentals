document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('sortable-list');
    let draggedItem = null;

    const items = list.querySelectorAll('li');
    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault(); // Required to allow dropping
            const target = e.target;
            if (target && target !== draggedItem && target.nodeName === 'LI') {
                target.classList.add('over');
            }
        });

        item.addEventListener('dragleave', () => {
            item.classList.remove('over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem && e.target.nodeName === 'LI') {
                const itemsArray = Array.from(list.querySelectorAll('li'));
                const draggedIndex = itemsArray.indexOf(draggedItem);
                const targetIndex = itemsArray.indexOf(e.target);

                if (draggedIndex !== targetIndex) {
                    if (draggedIndex < targetIndex) {
                        list.insertBefore(draggedItem, e.target.nextSibling);
                    } else {
                        list.insertBefore(draggedItem, e.target);
                    }
                }
            }
            items.forEach(item => item.classList.remove('over'));
        });
    });
});
