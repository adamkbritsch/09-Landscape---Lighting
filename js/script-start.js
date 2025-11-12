const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const navButton = document.querySelector('#navToggle');
const navWrapper = document.querySelector('#primary-nav');
const navList = document.querySelector('#theNav');
const parentItems = document.querySelectorAll('.parent');
const mobileQuery = window.matchMedia('(max-width: 767px)');

const resetParents = () => {
  parentItems.forEach(item => {
    item.classList.remove('is-open');
    item.querySelector('.menu-item__link')?.setAttribute('aria-expanded', 'false');
  });
};

const setNavState = isOpen => {
  if (!navButton || !navWrapper || !navList) return;
  navButton.classList.toggle('open', isOpen);
  navWrapper.classList.toggle('open', isOpen);
  navList.classList.toggle('open', isOpen);
  navButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

  if (!isOpen) {
    resetParents();
  }
};

const toggleNav = () => {
  const isOpen = !navButton?.classList.contains('open');
  setNavState(isOpen);
};

navButton?.addEventListener('click', toggleNav);

const closeNavOnDesktop = event => {
  if (!event.matches) {
    setNavState(false);
  }
};

if (typeof mobileQuery.addEventListener === 'function') {
  mobileQuery.addEventListener('change', closeNavOnDesktop);
} else if (typeof mobileQuery.addListener === 'function') {
  mobileQuery.addListener(closeNavOnDesktop);
}

const parentLinks = document.querySelectorAll('.parent > .menu-item__link');
parentLinks.forEach(link => {
  link.setAttribute('aria-expanded', 'false');

  link.addEventListener('click', event => {
    event.preventDefault();
    const parent = link.parentElement;
    const willOpen = !parent.classList.contains('is-open');
    parentItems.forEach(item => {
      if (item !== parent) {
        item.classList.remove('is-open');
        item.querySelector('.menu-item__link')?.setAttribute('aria-expanded', 'false');
      }
    });
    parent.classList.toggle('is-open', willOpen);
    link.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });
});

const navLinks = navList ? navList.querySelectorAll('a') : [];
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileQuery.matches) return;
    const parent = link.closest('.parent');
    if (parent && parent.querySelector('.menu-item__link') === link) return;
    setNavState(false);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navButton?.classList.contains('open')) {
    setNavState(false);
    navButton?.focus();
  }
});

const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'slide',
  speed: 2000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});
