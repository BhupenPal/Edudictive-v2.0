let searchIcon = document.querySelector(".searchIcon img")
let searchBox = document.querySelector(".searchBox")
let crossIcon = document.querySelector(".crossimage")

searchIcon.onclick = function(){
    let _ = this
    _.parentElement.style.cssText = "opacity: 0; visibility: hidden"
    setTimeout(function(){
        _.parentElement.style.cssText = "opacity: 0; visibility: hidden; display:none"
    },100)

    searchBox.classList.replace('propertyBoxInitial','propertyBoxChanged')
}

crossIcon.onclick = function(){
    let _ = searchIcon
    _.parentElement.style.cssText = "opacity: 0; visibility: hidden; display:block"
    setTimeout(function(){
        _.parentElement.style.cssText = "opacity: 1; visibility: visible; "
    },0)

    searchBox.classList.replace('propertyBoxChanged','propertyBoxInitial')
}