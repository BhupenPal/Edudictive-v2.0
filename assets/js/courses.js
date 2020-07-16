let courses = document.querySelectorAll(".course-card");
let gradientArray = [
  "linear-gradient(180deg, #6A11CB 0%, #2575FC 100%);",
  "linear-gradient(180deg, #30CFD0 0%, #330867 100%);",
  "linear-gradient(180deg, #453A94 0%, #F43B47 100%);",
  "linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%);",
  "linear-gradient(180deg, #FF0844 0%, #FFB199 100%);",
  "linear-gradient(180deg, #453A94 0%, #F43B47 100%);",
  "linear-gradient(180deg, #00063D 0%, #004e92 100%);",
  "linear-gradient(180deg, #30CFD0 0%, #330867 100%);",
  "linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%);",
  "linear-gradient(180deg, #00063D 0%, #004e92 100%);"
]

courses.forEach(item => {
  item.setAttribute("style",`background-image: ${gradientArray[item.getAttribute("data-value")]}`)
})

let currentcard = courses[0];
let courseWrapper = document.querySelector(".course-wrapper")

function slider(x) {
  let execution_point = x.children[0].className
  if(execution_point.includes("left")){
    if(currentcard.getAttribute("data-value")>0){
      let computedstyle = getComputedStyle(currentcard)
      let curmargin = parseInt(computedstyle.marginLeft) + parseInt(computedstyle.marginRight)
      courseWrapper.scrollBy(-(currentcard.previousElementSibling.offsetWidth + curmargin),0)
      currentcard = currentcard.previousElementSibling
    }
    else{
      console.log("cannot execute left")
    }
  }
  if(execution_point.includes("right")){
    if(currentcard.getAttribute("data-value")<9){
      let computedstyle = getComputedStyle(currentcard)
      let curmargin = parseInt(computedstyle.marginLeft) + parseInt(computedstyle.marginRight)
      currentcard = currentcard.nextElementSibling
      courseWrapper.scrollBy((currentcard.nextElementSibling.offsetWidth + curmargin),0)
    }
    else{
      console.log("cannot execute right")
    }
  }
}

let courses_wishlist=[];
local_storage=localStorage.getItem("myobj")
if(localStorage.length>0){
  local_courses=JSON.parse(local_storage)
  for(var i=0;i<local_courses.length;i++){
    courses_wishlist.push(local_courses[i])
  }
}

function heartanimate(x){
  let parentEle = x.parentNode;
  let parentElement=x.parentElement.parentElement.parentElement
  var course_name=parentElement.getElementsByClassName('course-name-wrapper')[0].getElementsByClassName('course-name')[0];
  let obj={
    name:course_name.innerText
  }
  if(!parentEle.hasAttribute('data-state')&&(!courses_wishlist.includes(obj.name))){
    parentEle.setAttribute('data-state','clicked')
    parentEle.innerHTML = `<lottie-player onclick="heartanimate(this)" src="/assets/Json/Like.json" background="transparent"  speed="1" loop autoplay></lottie-player>`
    wishlist_add(obj)
  }
  else{
    parentEle.removeAttribute('data-state')
    parentEle.innerHTML = `<img onclick="heartanimate(this)" src="/assets/images/svgs/heart.svg" alt="">`
    remove_wishlist_item(obj)
  }
}

function wishlist_add(obj){
  courses_wishlist.push(obj.name)
  localStorage.setItem("myobj",JSON.stringify(courses_wishlist))
}

function remove_wishlist_item(obj){                
  localStorage.removeItem('myobj')
  for(var i=0;i<courses_wishlist.length;i++)
  {
      if (courses_wishlist[i]==obj.name){
          index_of_removable_course=i
      }
  }
  courses_wishlist.splice(index_of_removable_course,1)
  localStorage.setItem("myobj",JSON.stringify(courses_wishlist))
}