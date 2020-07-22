function eventini(x) {
    let pretext = document.querySelector(".rd_pretext")
    let posttext = document.querySelector(".rd_aftrtext")
    if (x.innerHTML == "Know More") {
        pretext.style.visibility = "hidden"
        pretext.style.opacity = "0"
        posttext.style.height = "100%"
        posttext.style.width = "50%"
        posttext.style.visibility = "visible"
        posttext.style.opacity = "1"
        posttext.style.top = "0"
        for (var el = 0; el < posttext.children.length; el++) {
            posttext.children[el].style.opacity = "0";
        }
        setTimeout(function () {
            for (var el = 0; el < posttext.children.length; el++) {
                posttext.children[el].style.opacity = "1";
            }
        }, 600)
    }
    else {
        for (var el = 0; el < posttext.children.length; el++) {
            posttext.children[el].style.opacity = "0";
        }
        posttext.style.height = "0%"
        posttext.style.width = "0%"
        posttext.style.top = "100%"
        posttext.style.opacity = "0"
        posttext.style.visibility = "hidden"
        setTimeout(function () {
            for (var el = 0; el < posttext.children.length; el++) {
                posttext.children[el].style.opacity = "1";
            }
        }, 600)
        setTimeout(function () {
            pretext.style.visibility = "visible"
            pretext.style.opacity = "1"
        }, 200)
    }
}

let team_img = document.querySelectorAll(".member-img")

for (var i = 0; i < team_img.length; i++) {
    (function (i) {
        team_img[i].addEventListener('mouseenter', function () {
            let anid = document.createElement('div')
            anid.classList.add("anid")
            anid.innerHTML = `<lottie-player src="/assets/Json/Linkedin.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>`
            this.appendChild(anid)
        });
        team_img[i].addEventListener("mouseleave", function () {
            let parent = this
            parent.removeChild(parent.children[1])
        });
    })(i);
}