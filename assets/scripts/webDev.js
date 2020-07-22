// -----------------program structure----------------------

function myFunction(ele) {
  ele.nextElementSibling.classList.toggle("show")
  ele.children[0].classList.toggle("fa-rotate-180");
}

// ---------------------slider------------------------

const track = document.querySelector(".caraousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".caraousel_button--right");
const prevButton = document.querySelector(".caraousel_button--left");
const dotsNav = document.querySelector(".caraousel_nav");
const dots = Array.from(dotsNav.children);

const slidesSize = slides[0].getBoundingClientRect();
const slideWidth = slidesSize.width;

//arrange the slide next to each other
for (let i = 0; i < slides.length; i++) {
  slides[i].style.left = slideWidth * i + "px";
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current_slide");
  targetSlide.classList.add("current_slide");
};

//left button should change the slide

//right button should change the slide

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current_slide");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
});

//nav indicators should move to the required slides

dotsNav.addEventListener("click", (e) => {
  //clicked element
  const targetdot = e.target.closest("button");

  if (!targetdot) return;

  const currentSlide = track.querySelector(".current_slide");
  const currentDot = dotsNav.querySelector(".current_slide");

  const targetIndex = dots.findIndex((dot) => dot === targetdot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  currentDot.classList.remove("current_slide");
  targetdot.classList.add("current_slide");
});
