document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing click events for About page');

    // Find all expandable boxes
    const expandableBoxes = document.querySelectorAll('.expandable');
    console.log('Found expandable boxes:', expandableBoxes.length);

    if (expandableBoxes.length === 0) {
        console.warn('No expandable boxes found. Check if the .expandable class is applied correctly.');
        return;
    }

    // Add click event listeners to each expandable box
    expandableBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Box clicked:', box.querySelector('h2').textContent);
            const isExpanded = box.classList.contains('expanded');

            // Collapse all other boxes
            expandableBoxes.forEach(otherBox => {
                otherBox.classList.remove('expanded');
            });

            // Toggle the clicked box
            if (!isExpanded) {
                box.classList.add('expanded');
            }
        });

        // Prevent hover effects when expanded
        box.addEventListener('mouseenter', () => {
            if (box.classList.contains('expanded')) {
                console.log('Box is expanded, disabling hover effects for:', box.querySelector('h2').textContent);
                const scrollingText = box.querySelector('.scrolling-text');
                const staticText = box.querySelector('.static-text');
                if (scrollingText) scrollingText.style.display = 'none';
                if (staticText) staticText.style.display = 'none';
            }
        });
    });
});