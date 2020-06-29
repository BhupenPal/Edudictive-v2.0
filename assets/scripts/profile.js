const heads = document.querySelectorAll(".heads");
heads[0].classList.replace("inactive-head","active-head")
heads[6].classList.replace("inactive-head","active-head")
for (var i = 0; i < heads.length; i++) {
  (function(i) {
    heads[i].addEventListener('click', function(){
        heads.forEach(el=>{
            el.classList.replace("active-head","inactive-head")
        })
        this.classList.replace("inactive-head","active-head")
    })
  })(i);
}