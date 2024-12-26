document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const body = document.body;

    // Check local storage for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle the mode when the button is clicked
    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        toggleBtn.innerHTML = body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
});
