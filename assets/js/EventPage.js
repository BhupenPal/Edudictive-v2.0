let heads = document.querySelectorAll(".heads");

if (heads.length >= 2) {
    let sessions = document.querySelector(".sessions");
    let webinars = document.querySelector(".webinars");

    heads[0].onclick = function () {
        this.classList.replace("inactive-head", "active-head");
        heads[1].classList.replace("active-head", "inactive-head");
        this.querySelector(".underline").classList.add("active_under");
        heads[1].querySelector(".underline").classList.remove("active_under");
        sessions.style.cssText = "display: none";
        webinars.style.cssText = "display: block";
    };

    heads[1].onclick = function () {
        this.classList.replace("inactive-head", "active-head");
        heads[0].classList.replace("active-head", "inactive-head");
        this.querySelector(".underline").classList.add("active_under");
        heads[0].querySelector(".underline").classList.remove("active_under");
        sessions.style.cssText = "display: block";
        webinars.style.cssText = "display: none";
    };
}

// For slider
let slide = document.querySelectorAll(".wslide");
let s_control = document.querySelectorAll(".slider-controller div");
let interval = null;

s_control.forEach((element) => {
    element.addEventListener("click", slider);
});
function slider() {
    clearInterval(interval);
    let currsl = 0;
    let currel = this.getAttribute("data-identity");
    for (let el = 0; el < s_control.length; el++) {
        if (s_control[el].classList.contains("active-slide")) {
            currsl = el;
            s_control[el].classList.remove("active-slide");
            s_control[el].classList.add("inactive-slide");
            slide[el].classList.remove("active-wslide");
            break;
        }
    }
    slide[currel].classList.add("active-wslide");
    s_control[currel].classList.add("active-slide");
    interval = setInterval(another, 5000);
}

function another() {
    let currsl = 0;
    let nextsl = 0;
    for (let el = 0; el < s_control.length; el++) {
        if (s_control[el].classList.contains("active-slide")) {
            currsl = el;
            s_control[el].classList.remove("active-slide");
            s_control[el].classList.add("inactive-slide");
            slide[el].classList.remove("active-wslide");
            break;
        }
    }
    if (currsl < slide.length - 1) {
        nextsl = currsl + 1;
    } else {
        nextsl = 0;
    }
    slide[nextsl].classList.add("active-wslide");
    s_control[nextsl].classList.add("active-slide");
}

// interval = setInterval(another, 5000);

function animatedsubsec() {
    let contactForm = document.querySelector(".form-div")
    contactForm.style.cssText = "  height: 20rem; width: 30rem;"
    let formC = contactForm.children[0]
    formC.style.display = "none"
    let submissiondiv = document.querySelector(".submission-div")
    submissiondiv.style.transform = "scale(1)"
}

const FormElement = document.getElementById("eventInputs");
preventer(FormElement, Ajax);
function Ajax() {
    document.getElementsByClassName('loader')[0].style.display = 'block'
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/event-register/${EventKey}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.getResponseHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function () {
        if (this.status === 200) {
            document.getElementsByClassName('loader')[0].style.display = 'none'
            document.getElementById('hide-after').style.display = 'none'
            animatedsubsec();
        } else {
            console.log("ERROR: AJAX COULD NOT CONNECT");
        }
    };
    xhr.send(getFields(FormElement));
}

let speakerImg = document.querySelectorAll(".speaker-ini")
console.log(speakerImg)

for (var i = 0; i < speakerImg.length; i++) {
    (function (i) {
        speakerImg[i].addEventListener('mouseenter', function () {
            let anid = document.createElement('div')
            anid.classList.add("anid")
            anid.innerHTML = `<lottie-player src="/assets/Json/Linkedin.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>`
            this.appendChild(anid)
        });
        speakerImg[i].addEventListener("mouseleave", function () {
            let parent = this
            parent.removeChild(parent.children[1])
        });
    })(i);
}