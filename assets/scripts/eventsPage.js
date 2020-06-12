let heads = document.querySelectorAll(".heads")
let sessions = document.querySelector(".sessions")
let webinars = document.querySelector(".webinars")

heads[0].onclick = function(){
        this.classList.replace("inactive-head","active-head")
        heads[1].classList.replace("active-head","inactive-head")
        this.querySelector(".underline").classList.add("active_under")
        heads[1].querySelector(".underline").classList.remove("active_under")
        sessions.style.cssText = "display: none"
        webinars.style.cssText = "display: block"
}

heads[1].onclick = function(){
        this.classList.replace("inactive-head","active-head")
        heads[0].classList.replace("active-head","inactive-head")
        this.querySelector(".underline").classList.add("active_under")
        heads[0].querySelector(".underline").classList.remove("active_under")
        sessions.style.cssText = "display: block"
        webinars.style.cssText = "display: none"
}

// For slider
let slide = document.querySelectorAll(".wslide")
let s_control = document.querySelectorAll(".slider-controller div")
let interval = null;

s_control.forEach(element => {
        element.addEventListener("click",slider)
});
function slider(){
        clearInterval(interval)
        let currsl = 0
        let currel = this.getAttribute('data-identity')
        for(let el=0; el<s_control.length;el++){
                if(s_control[el].classList.contains("active-slide")){
                        currsl = el;
                        s_control[el].classList.remove("active-slide")
                        s_control[el].classList.add('inactive-slide')
                        slide[el].classList.remove("active-wslide")
                        break
                }
        }
        slide[currel].classList.add('active-wslide')
        s_control[currel].classList.add('active-slide')
        interval = setInterval(another,5000)
}


function another(){
                let currsl = 0
                let nextsl = 0
                for(let el=0; el<s_control.length;el++){
                        if(s_control[el].classList.contains("active-slide")){
                                currsl = el;
                                s_control[el].classList.remove("active-slide")
                                s_control[el].classList.add('inactive-slide')
                                slide[el].classList.remove("active-wslide")
                                break
                        }
                }
                if(currsl<2){
                        nextsl = currsl+1
                }else{
                        nextsl = 0
                }
                slide[nextsl].classList.add('active-wslide')
                s_control[nextsl].classList.add('active-slide')
        }

interval = setInterval(another, 5000)