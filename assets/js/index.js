/* Header */
let searchIcon = document.querySelector(".searchIcon img")
let searchBox = document.querySelector(".searchBox")
let crossIcon = document.querySelector(".crossimage")
let userDropDown = document.querySelector(".controlSettings")
let userHandler = document.querySelector(".userHandler")
let moreOptionDropDown = document.querySelector(".moreOptionDropDown")
let moreOptions = document.querySelector(".moreOptions span")
let hamBurgerIcon = document.querySelector(".hamBurgerIcon")
let hamLine = document.querySelectorAll(".hamBurgerIcon .hamLine")
let mobileMenu = document.querySelector(".mobileMenu")

searchIcon.onclick = function () {
    let _ = this
    _.parentElement.style.cssText = "opacity: 0; visibility: hidden"
    setTimeout(function () {
        _.parentElement.style.cssText = "opacity: 0; visibility: hidden; display:none"
    }, 100)

    searchBox.classList.replace('propertyBoxInitial', 'propertyBoxChanged')
}

crossIcon.onclick = function () {
    let _ = searchIcon
    _.parentElement.style.cssText = "opacity: 0; visibility: hidden; display:block"
    setTimeout(function () {
        _.parentElement.style.cssText = "opacity: 1; visibility: visible; "
    }, 0)

    searchBox.classList.replace('propertyBoxChanged', 'propertyBoxInitial')
}

userHandler.addEventListener('click', function () {
    let event_ini = userDropDown.getAttribute('data-state')
    if (!userDropDown.contains(event.target)) {
        if (event_ini === "clicked") {
            userDropDown.setAttribute('data-state', 'unclicked')
            userDropDown.removeAttribute('style')
            return
        }
    }
    if (event_ini === "unclicked") {
        userDropDown.setAttribute('data-state', 'clicked')
        userDropDown.style.cssText = "visibility: visible; opacity: 1"
        return
    }
})

moreOptions.addEventListener('click', function () {
    let event_ini = moreOptions.getAttribute('data-state')
    if (!moreOptionDropDown.contains(event.target)) {
        if (event_ini === 'clicked') {
            moreOptions.setAttribute('data-state', 'unclicked')
            moreOptionDropDown.removeAttribute('style')
            return
        }
    }
    if (event_ini === 'unclicked') {
        moreOptions.setAttribute('data-state', 'clicked')
        moreOptionDropDown.style.cssText = 'visibility: visible; opacity: 1'
    }
})

document.body.addEventListener('click', function (e) {
    if (!userHandler.contains(e.target)) {
        userDropDown.setAttribute('data-state', 'unclicked')
        userDropDown.removeAttribute('style')
    }
    if (!moreOptions.contains(e.target)) {
        moreOptions.setAttribute('data-state', 'unclicked')
        moreOptionDropDown.removeAttribute('style')
    }
})

// hamaction
hamBurgerIcon.addEventListener('click', function () {
    if (!hamBurgerIcon.hasAttribute('data-click')) {
        hamBurgerIcon.setAttribute('data-click', 'clicked')
        hamLine[0].style.cssText = "transform: rotate(135deg); top: 0; width: 100%"
        hamLine[1].style.cssText = "transform: scale(0); top: 0; width: 100%"
        hamLine[2].style.cssText = "transform: rotate(-135deg); top: 0; width: 100%"
        mobileMenu.style.cssText = "visibility: visible; opacity: 1; user-select: all"
        return
    } else {
        hamBurgerIcon.removeAttribute('data-click')
        for (let i = 0; i < hamLine.length; i++) {
            hamLine[i].removeAttribute('style')
        }
        mobileMenu.removeAttribute('style')
    }

})
/* Header */


/* Link Handle */
const LinkHandle = (URL, NewWindow) => {
    if (NewWindow == "blank") {
        window.open(URL);
    } else {
        window.location.href = URL;
    }
};
/* Link Handle */

/* Anchor Jumping */
const JumpTo = (ElemID) => {
    const TopOfElement = document.querySelector(ElemID).offsetTop - document.querySelector('.mainHeader').offsetHeight;
    window.scroll({ top: TopOfElement });
}
/* Anchor Jumping */

/* Course Structure Toggle */
function StructureToggle(ele) {
    ele.nextElementSibling.classList.toggle("show")
    ele.children[0].classList.toggle("fa-rotate-180");
}
/* Course Structure Toggle */

/* AJAX HANDLER */
function getFields(FormElement) {
    let reqBody = {};
    Object.keys(FormElement.elements).forEach((key) => {
        let element = FormElement.elements[key];
        if (element.type !== "submit") {
            reqBody[element.name] = element.value;
        }
    });
    return JSON.stringify(reqBody);
}

function preventer(FormElement, CallBack) {
    FormElement.addEventListener("submit", () => {
        event.preventDefault();
        CallBack();
    });
}

function urlCheck(ToCheck) {
    let flag = false;
    ToCheck.map(x => {
        if (window.location.href.indexOf(x) > -1) {
            flag = true;
        }
    })
    return flag;
}
/* AJAX HANDLER */

/* Contact Form Ajax */
if (urlCheck(["programs", "events", "about-us", "contact-us"])) {
    const FormElement = document.getElementById("contactForm");
    preventer(FormElement, Ajax);
    function Ajax() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/contact-us", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.getResponseHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function () {
            if (this.status === 200) {
                console.log(this.response);
                animatedsub();
                if (this.response == "Done") {
                    console.log('Done')
                }
            } else {
                console.log("ERROR: AJAX COULD NOT CONNECT");
            }
        };
        xhr.send(getFields(FormElement));
    }
}
/* Contact Form Ajax */

/* Courses Slider */
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
    item.setAttribute("style", `background-image: ${gradientArray[item.getAttribute("data-value")]}`)
})

let currentcard = courses[0];
let courseWrapper = document.querySelector(".course-wrapper")

function slider(x) {
    let execution_point = x.children[0].className
    if (execution_point.includes("left")) {
        if (currentcard.getAttribute("data-value") > 0) {
            let computedstyle = getComputedStyle(currentcard)
            let curmargin = parseInt(computedstyle.marginLeft) + parseInt(computedstyle.marginRight)
            courseWrapper.scrollBy(-(currentcard.previousElementSibling.offsetWidth + curmargin), 0)
            currentcard = currentcard.previousElementSibling
        }
        else {
            console.log("cannot execute left")
        }
    }
    if (execution_point.includes("right")) {
        if (currentcard.getAttribute("data-value") < courses.length - 1) {
            let computedstyle = getComputedStyle(currentcard)
            let curmargin = parseInt(computedstyle.marginLeft) + parseInt(computedstyle.marginRight)
            currentcard = currentcard.nextElementSibling
            courseWrapper.scrollBy((currentcard.nextElementSibling.offsetWidth + curmargin), 0)
        }
        else {
            console.log("cannot execute right")
        }
    }
}

let courses_wishlist = [];
local_storage = localStorage.getItem("myobj")
if (localStorage.length > 0) {
    local_courses = JSON.parse(local_storage)
    for (var i = 0; i < local_courses.length; i++) {
        courses_wishlist.push(local_courses[i])
    }
}

function heartanimate(x) {
    let parentEle = x.parentNode;
    let parentElement = x.parentElement.parentElement.parentElement
    var course_name = parentElement.getElementsByClassName('course-name-wrapper')[0].getElementsByClassName('course-name')[0];
    let obj = {
        name: course_name.innerText
    }
    if (!parentEle.hasAttribute('data-state') && (!courses_wishlist.includes(obj.name))) {
        parentEle.setAttribute('data-state', 'clicked')
        parentEle.innerHTML = `<lottie-player onclick="heartanimate(this)" src="/assets/Json/Like.json" background="transparent" speed="1" autoplay></lottie-player>`
        wishlist_add(obj)
    }
    else {
        parentEle.removeAttribute('data-state')
        parentEle.innerHTML = `<img onclick="heartanimate(this)" src="/assets/images/svgs/heart.svg" alt="">`
        remove_wishlist_item(obj)
    }
}

function wishlist_add(obj) {
    courses_wishlist.push(obj.name)
    localStorage.setItem("myobj", JSON.stringify(courses_wishlist))
}

function remove_wishlist_item(obj) {
    localStorage.removeItem('myobj')
    for (var i = 0; i < courses_wishlist.length; i++) {
        if (courses_wishlist[i] == obj.name) {
            index_of_removable_course = i
        }
    }
    courses_wishlist.splice(index_of_removable_course, 1)
    localStorage.setItem("myobj", JSON.stringify(courses_wishlist))
}
// Temporary solution
localStorage.clear();
courses_wishlist = [];

// Rating system
let courseRating = [];

courses.forEach(item => {
    let ratingnum = item.querySelector('.rating-stars').getAttribute('data-rating')
    let ratingEle = item.querySelector('.rating-stars')
    ratingEle.innerHTML = ratingsys(ratingnum);
})

function ratingsys(courseRatingNum) {
    let filleds = parseInt(courseRatingNum)
    let hdetermine = courseRatingNum - filleds;
    let halfFilleds;
    if (hdetermine >= 0.5) {
        halfFilleds = 1
    } else {
        halfFilleds = 0
    }

    let output = ``

    for (let i = 0; i < filleds; i++) {
        output = output + `<img src="/assets/images/svgs/Filled-Star.svg" alt="">`
    }
    for (let j = 0; j < halfFilleds; j++) {
        output = output + `<img src="/assets/images/svgs/half filled star.svg" alt="">`
    }

    return output
}
/* Courses Slider*/

/* Review Slider*/
let reviewContainer = document.querySelector(".review-card-container")
let reviewCards = document.querySelectorAll(".review-card")
let reviewPoints = document.querySelectorAll(".review-points")
let pairElef = reviewCards.item(0)
let pairEles = pairElef.nextElementSibling

let slideInterval = setInterval(function () {

    reviewCards.forEach(item => {
        item.classList.add("vanish")
        item.removeAttribute('style')
    })

    if (pairEles.nextElementSibling) {
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

    setTimeout(function () {
        pairEles.style.cssText = "visibility: visible; opacity:1;"
        pairElef.style.cssText = "visibility: visible; opacity:1; margin-left: 0"
    }, 400)
}, 5000)


// Point Changer
function PointChanger() {
    let currentItem = null;
    for (let i = 0; i < reviewPoints.length; i++) {
        if (reviewPoints[i].hasAttribute('data-point')) {
            currentItem = reviewPoints[i]
            break
        }
    }

    reviewPoints.forEach(item => {
        item.removeAttribute('data-point')
        item.classList.remove("active-review-point")
    })

    if (currentItem.nextElementSibling) {
        currentItem.nextElementSibling.setAttribute('data-point', 'active')
        currentItem.nextElementSibling.classList.add("active-review-point")
    } else {
        reviewPoints[0].setAttribute('data-point', 'active')
        reviewPoints[0].classList.add('active-review-point')
    }
}

setInterval(function () {
    PointChanger();
}, 5000)
// Point Changer Finished

reviewPoints[0].classList.add('active-review-point')
reviewPoints[0].setAttribute('data-point', 'active')
reviewCards[0].classList.remove("vanish")
reviewCards[1].classList.remove("vanish")
reviewCards[0].style.cssText = "visibility: visible; opacity:1"
reviewCards[1].style.cssText = "visibility: visible; opacity:1"
/* Review Slider*/