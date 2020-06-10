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
let s_control = document.querySelector(".slider-controller").children
slide[0].style.cssText = "visibility: visible; opacity:1"
function slider(x){
        if(x==1){
                for(let i=0; i<slide.length; i++) slide[i].removeAttribute("style");

                for(let i=0; i<s_control.length; i++){
                        s_control[i].classList.add("inactive-slide") 
                        s_control[i].classList.remove("active-slide")
                }
                
                slide[0].style.cssText = "visibility: visible; opacity:1"
                s_control[0].classList.add("active-slide")
        }

        if(x==2){
                for(let i=0; i<slide.length; i++) slide[i].removeAttribute("style");

                for(let i=0; i<s_control.length; i++){
                        s_control[i].classList.add("inactive-slide") 
                        s_control[i].classList.remove("active-slide")
                }

                slide[1].style.cssText = "visibility: visible; opacity:1"
                s_control[1].classList.add("active-slide")
        }

        if(x==3){
                for(let i=0; i<slide.length; i++) slide[i].removeAttribute("style");

                for(let i=0; i<s_control.length; i++){
                        s_control[i].classList.add("inactive-slide") 
                        s_control[i].classList.remove("active-slide")
                }
                
                slide[2].style.cssText = "visibility: visible; opacity:1"
                s_control[2].classList.add("active-slide")
        }
}
