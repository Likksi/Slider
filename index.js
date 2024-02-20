document.addEventListener("DOMContentLoaded", function () {
  let images = [
    {
      url: "images/png/img1.png",
      city1: "Rostov-on-Don",
      city2: "LCD admiral",
      area: "81 m2",
      time: "3.5 months",
      cost: "Upon request",
      title: "ROSTOV-ON-DON, ADMIRAL"
    },
    {
      url: "images/png/img2.png",
      city1: "Sochi",
      city2: "Thieves",
      area: "105 m2",
      time: "4 months",
      cost: "Upon request",
      title: "SOCHI THIEVES"
    },
    {
      url: "images/png/img3.png",
      city1: "Rostov-on-Don",
      city2: "Patriotic",
      area: "93 m2",
      time: "3 months",
      cost: "Upon request",
      title: "ROSTOV-ON-DON PATRIOTIC"
    }
  ];

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderMenuLinks = document.querySelector(".menu__links");

  let currentIndex = 0;

  function initSlider() {
    initImages();
    initArrows();
    initDots();
    initMenuLinks();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}" data-city="${images[index].city1} ${images[index].city2}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });

    updateCardInfo(0);
  }

  function initArrows() {
    sliderArrows.addEventListener("click", function (event) {
      if (event.target.classList && event.target.classList.contains("slider__arrow")) {
        let direction = event.target.classList.contains("left") ? -1 : 1;
        let nextIndex = (currentIndex + direction + images.length) % images.length;
        moveSlider(nextIndex);
      }
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });

    sliderDots.addEventListener("click", function (event) {
      if (event.target.classList && event.target.classList.contains("slider__dots-item")) {
        let index = event.target.dataset.index;
        moveSlider(index);
      }
    });
  }

  function moveSlider(num) {
    let activeImage = sliderImages.querySelector(".active");
    let activeDot = sliderDots.querySelector(".active");

    if (activeImage) activeImage.classList.remove("active");
    if (activeDot) activeDot.classList.remove("active");

    let nextImage = sliderImages.querySelector(".n" + num);
    let nextDot = sliderDots.querySelector(".n" + num);

    if (nextImage) nextImage.classList.add("active");
    if (nextDot) nextDot.classList.add("active");

    updateCardInfo(num);
    currentIndex = num;
  }
  
  function initMenuLinks() {
    images.forEach((image, index) => {
      let link = `<div class="menu__link-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${image.title}</div>`;
      sliderMenuLinks.innerHTML += link;
    });

    sliderMenuLinks.addEventListener("click", function (event) {
      if (event.target.classList && event.target.classList.contains("menu__link-item")) {
        let index = event.target.dataset.index;
        moveSlider(index);
      }
    });
  }

  function updateCardInfo(num) {
    let currentImage = images[num];
    let sliderCards = document.querySelectorAll(".card");

    sliderCards.forEach((card, index) => {
      let city1Element = card.querySelector(".city1");
      let city2Element = card.querySelector(".city2");
      let areaElement = card.querySelector(".area");
      let timeElement = card.querySelector(".time");
      let costElement = card.querySelector(".cost");

      let city1Value = city1Element ? currentImage?.city1 || "" : "";
      let city2Value = city2Element ? currentImage?.city2 || "" : "";
      let areaValue = areaElement ? currentImage?.area || "" : "";
      let timeValue = timeElement ? currentImage?.time || "" : "";
      let costValue = costElement ? currentImage?.cost || "" : "";

      if (city1Element) city1Element.innerText = city1Value;
      if (city2Element) city2Element.innerText = city2Value;
      if (areaElement) areaElement.innerText = areaValue;
      if (timeElement) timeElement.innerText = timeValue;
      if (costElement) costElement.innerText = costValue;
    });
  }

  initSlider();
});
