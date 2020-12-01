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

/* slider before-after */
{
  const slider = document.querySelector('.slider__wrapper');
  const resizedImageWrapper = slider.querySelector('.slider__img-resize');
  const resizedImage = slider.querySelector('.slider__img-before>img');
  const sliderRange = slider.querySelector('.slider__range');
  const sliderRangeHandle = slider.querySelector('.slider__range-toggle');
  const sliderRangeHandleMobile = slider.querySelector('.slide__range-mobile-toggle');
  const btnBefore = slider.querySelector('.slider__btn--before');
  const btnAfter = slider.querySelector('.slider__btn--after');

  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

  btnBefore.addEventListener('click', () => {
    resizedImageWrapper.classList.add('transition-resize');
    sliderRangeHandle.classList.add('transition-resize');
    sliderRangeHandleMobile.classList.add('transition-resize');
    slider.style.setProperty('--show-persent', '0' + '%');
  });

  btnAfter.addEventListener('click', () => {
    resizedImageWrapper.classList.add('transition-resize');
    sliderRangeHandle.classList.add('transition-resize');
    sliderRangeHandleMobile.classList.add('transition-resize');
    slider.style.setProperty('--show-persent', '100' + '%');
  });


  function imageCompare() {
    sliderRangeHandle.onmousedown = () => {
      //console.log('нажата');
      resizedImageWrapper.classList.remove('transition-resize');
      sliderRangeHandle.classList.remove('transition-resize');

      slider.onmousemove = (evt) => {
        let mouseX = evt.pageX;
        let sliderRangeWidth = sliderRange.offsetWidth;
        let sliderRangeX = sliderRange.getBoundingClientRect().left;
        let offset = mouseX - sliderRangeX;

        if (offset < 0) {
          offset = 0;
        };
        if (offset > sliderRangeWidth) {
          offset = sliderRangeWidth;
        };

        let offsetInPersent = Math.round(offset * 100 / sliderRangeWidth);
        slider.style.setProperty('--show-persent', offsetInPersent + '%');
        //console.log(mouseX, sliderRangeX, sliderRangeWidth, offset, offsetInPersent);
      };

      document.onmouseup = () => {
        slider.onmousemove = null;
        sliderRangeHandle.onmouseup = null;
        //console.log('отпущена');
      }

      sliderRangeHandle.ondragstart = function () {
        return false;
      };
    };
  };

  function imageCompareOnTouch() {
    sliderRangeHandle.ontouchstart = () => {
      //console.log('нажата');
      resizedImageWrapper.classList.remove('transition-resize');
      sliderRangeHandle.classList.remove('transition-resize');
      sliderRangeHandleMobile.classList.remove('transition-resize');

      slider.ontouchmove = (evt) => {
        let mouseX = evt.pageX;
        let sliderRangeWidth = sliderRange.offsetWidth;
        let sliderRangeX = sliderRange.getBoundingClientRect().left;
        let offset = mouseX - sliderRangeX;

        if (offset < 0) {
          offset = 0;
        };
        if (offset > sliderRangeWidth) {
          offset = sliderRangeWidth;
        };

        let offsetInPersent = Math.round(offset * 100 / sliderRangeWidth);
        slider.style.setProperty('--show-persent', offsetInPersent + '%');
        //console.log(mouseX, sliderRangeX, sliderRangeWidth, offset, offsetInPersent);
      };

      document.ontouchend = () => {
        slider.ontouchmove = null;
        sliderRangeHandle.ontouchend = null;
        //console.log('отпущена');
      }

      sliderRangeHandle.ondragstart = function () {
        return false;
      };
    };
  };

  imageCompare();
}
//imageCompareOnTouch();


/* slider on hover */
// slider.addEventListener('mousemove', (evt) => {
//   resizedImageWrapper.classList.remove('transition-resize');
//   sliderRangeHandle.classList.remove('transition-resize');
//   let sliderWidth = slider.offsetWidth;
//   let coordXinPx = evt.offsetX;
//   let coordXinPersent = Math.round(coordXinPx * 100 / sliderWidth);

//   slider.style.setProperty('--show-persent', coordXinPersent + '%');
//   console.log('Длина слайдера в пикселях: ' + slider.offsetWidth + '. Позиция мышки в пикселях: ' + coordXinPx + '. И в процентах: ' + coordXinPersent);
// });

// slider.addEventListener('mouseleave', (evt) => {
//   resizedImageWrapper.classList.add('transition-resize');
//   sliderRangeHandle.classList.add('transition-resize');
//   slider.style.setProperty('--show-persent', '50' + '%');
// });
