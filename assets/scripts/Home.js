const ScrollHandler = (ElemID) => {
  let elem = document.querySelector(ElemID);
  console.log(elem);
  elem.scrollIntoView();
};

// review slider
let reviewContainer = document.querySelector(".review-card-container")
let reviewCards = document.querySelectorAll(".review-card")
let reviewPoints = document.querySelectorAll(".review-points")
let pairElef = reviewCards.item(0)
let pairEles = pairElef.nextElementSibling

let slideInterval = setInterval(function(){

  reviewCards.forEach(item => {
    item.classList.add("vanish")
    item.removeAttribute('style')
  })

  if(pairEles.nextElementSibling){
    pairElef = pairEles.nextElementSibling
    pairEles = pairElef.nextElementSibling
    pairElef.classList.remove("vanish")
    pairEles.classList.remove("vanish")
  } else {
    pairElef = reviewCards.item(0)
    pairEles = pairElef.nextElementSibling
    pairElef.classList.remove("vanish")
    pairEles.classList.remove("vanish")
    pairElef.style.cssText = "margin-left: 3rem"
  }

  setTimeout(function(){
    pairEles.style.cssText = "visibility: visible; opacity:1;"
    pairElef.style.cssText = "visibility: visible; opacity:1; margin-left: 0"
  },400)
},5000)


// Point Changer
function PointChanger(){
  let currentItem = null;
  for(let i=0; i<reviewPoints.length; i++){
    if(reviewPoints[i].hasAttribute('data-point')){
      currentItem = reviewPoints[i]
      break
    }
  }
  
  reviewPoints.forEach(item => {
    item.removeAttribute('data-point')
    item.classList.remove("active-review-point")
  })

  if(currentItem.nextElementSibling){
    currentItem.nextElementSibling.setAttribute('data-point','active')
    currentItem.nextElementSibling.classList.add("active-review-point")
  } else{
    reviewPoints[0].setAttribute('data-point','active')
    reviewPoints[0].classList.add('active-review-point')
  }
}

setInterval(function(){
  PointChanger();
},5000)
// Point Changer Finished

reviewPoints[0].classList.add('active-review-point')
reviewPoints[0].setAttribute('data-point','active')
reviewCards[0].classList.remove("vanish")
reviewCards[1].classList.remove("vanish")
reviewCards[0].style.cssText = "visibility: visible; opacity:1"
reviewCards[1].style.cssText = "visibility: visible; opacity:1"