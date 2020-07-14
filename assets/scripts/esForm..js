let elms = document.querySelectorAll("select");
var html = document.body.parentNode;
let arrow = null
html.addEventListener('click', function(event){
    event.preventDefault();
    elms.forEach(item => {
        if(!item.contains(event.target)){
            item.setAttribute("data-state","closed")
            arrow = item.parentNode.children[1]
            arrow.removeAttribute("style")
        }else{
            arrow = item.parentNode.children[1]
            arrow.style.cssText = "transform : rotate(180deg); filter: invert(39%) sepia(64%) saturate(1812%) hue-rotate(204deg) brightness(106%) contrast(96%);"
            if(item.getAttribute("data-state")=="opened"){
                arrow.removeAttribute("style")
                item.setAttribute("data-state","closed")
                item.style.cssText="border-color:#707070 !important"
                return
            }
            item.setAttribute("data-state","opened")
            item.removeAttribute("style")
        }
    })
})