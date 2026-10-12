document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  
  if (hamburger && dropdownMenu) {
    hamburger.addEventListener('click', () => {
      
      dropdownMenu.classList.toggle('active');
    });
  }
});