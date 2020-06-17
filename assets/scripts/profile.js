 const heads = document.querySelectorAll(".heads");
 if(window.location.href.indexOf("dashboard") != -1){
    heads[0].classList.replace("inactive-head","active-head")
}
if(window.location.href.indexOf("myprograms") != -1){
    heads[1].classList.replace("inactive-head","active-head")
}
if(window.location.href.indexOf("preferences") != -1){
    heads[2].classList.replace("inactive-head","active-head")
}
if(window.location.href.indexOf("community") != -1){
    heads[3].classList.replace("inactive-head","active-head")
}
if(window.location.href.indexOf("helpcenter") != -1){
    heads[4].classList.replace("inactive-head","active-head")
}
if(window.location.href.indexOf("faq") != -1){
    heads[5].classList.replace("inactive-head","active-head")
}