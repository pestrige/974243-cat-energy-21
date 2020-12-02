/* open-close mobile menu */
{
  const mainNav = document.querySelector('.main-nav');
  const menuBtn = document.querySelector('.humburger');
  const mainNavItem = mainNav.querySelectorAll('a[href]');

  mainNav.classList.remove('main-nav--nojs');
  mainNav.setAttribute('aria-hidden', true)
  menuBtn.classList.add('humburger--closed');

  menuBtn.onclick = (evt) => {
    evt.preventDefault();
    menuBtn.classList.toggle('humburger--closed');
    mainNav.classList.toggle('main-nav--opened');

    if (!mainNav.classList.contains('main-nav--opened')) {
      mainNav.setAttribute('aria-hidden', true);
    } else {
      mainNav.removeAttribute('aria-hidden');
    };
  };
}
