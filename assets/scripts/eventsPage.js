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

// interval = setInterval(another, 5000)


//learn more and register button

let learn_btn=document.getElementsByClassName("learn-more-btn")

for(var i=0;i<learn_btn.length;i++){
        learn_btn[i].addEventListener('click',function(e){
               parent=e.target.parentElement.parentElement
               web_info=parent.getElementsByClassName("web-info")
               heading=parent.getElementsByClassName("slide-heading")
               description=parent.getElementsByClassName("event-description")
               if(description[0].classList.contains("hide")){
                       description[0].classList.replace("hide","display")
                       e.target.innerText="Back"
                       web_info[0].classList.add("X-translation")
                       heading[0].classList.add("Y-translation")
               }
               else{
                       description[0].classList.replace("display","hide")
                       e.target.innerText="Learn More"
                       web_info[0].classList.remove("X-translation")
                       heading[0].classList.remove("Y-translation")
               }
        })
}

// learn_btn[0].addEventListener('click',function(e){
//         if(event_description[0].classList.contains("event-description-hide")){
//                 event_description[0].classList.replace("event-description-hide","event-description-display")
//                 learn_btn[0].innerText="Back"
//                 web_info_div[0].classList.add("X-translation")
//                 slide_heading_div[0].classList.add("Y-translation")
//                 // console.log(slide_heading_div[0].appendChild("<br>"))
                
                
//         }
//         else{
//                 event_description[0].classList.replace("event-description-display","event-description-hide")
//                 learn_btn[0].innerText="Learn More"
//                 web_info_div[0].classList.remove("X-translation")
//                 slide_heading_div[0].classList.remove("Y-translation")
        
//         }              
// })

// learn_btn[2].addEventListener('click',function(e){
//         if(event_description[1].classList.contains("event-description-hide")){
//                 event_description[1].classList.replace("event-description-hide","event-description-display")
//                 learn_btn[2].innerText="Back"
//                 web_info_div[1].classList.add("X-translation")
//                 slide_heading_div[1].classList.add("Y-translation")
                

                
//         }
//         else{
//                 event_description[1].classList.replace("event-description-display","event-description-hide")
//                 learn_btn[2].innerText="Learn More"
//                 web_info_div[1].classList.remove("X-translation")
//                 slide_heading_div[1].classList.remove("Y-translation")
//         }              
// })


// learn_btn[4].addEventListener('click',function(e){
//         if(event_description[2].classList.contains("event-description-hide")){
//                 event_description[2].classList.replace("event-description-hide","event-description-display")
//                 learn_btn[4].innerText="Back"
//                 web_info_div[2].classList.add("X-translation")
//                 slide_heading_div[2].classList.add("Y-translation")
                

                
//         }
//         else{
//                 event_description[2].classList.replace("event-description-display","event-description-hide")
//                 learn_btn[4].innerText="Learn More"
//                 web_info_div[2].classList.remove("X-translation")
//                 slide_heading_div[2].classList.remove("Y-translation")
//         }              
// })


