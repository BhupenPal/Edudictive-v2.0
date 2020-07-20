let searchIcon = document.querySelector(".searchIcon img")
let searchBox = document.querySelector(".searchBox")
let crossIcon = document.querySelector(".crossimage")
let userDropDown = document.querySelector(".controlSettings")
let userHandler = document.querySelector(".userHandler")
let moreOptionDropDown = document.querySelector(".moreOptionDropDown")
let moreOptions = document.querySelector(".moreOptions span")

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

userHandler.addEventListener('click',function(){
    let event_ini = userDropDown.getAttribute('data-state')
    if(!userDropDown.contains(event.target)){
        if(event_ini === "clicked"){
            userDropDown.setAttribute('data-state','unclicked')
            userDropDown.removeAttribute('style')
            return
        }
    }
    if(event_ini === "unclicked"){
        userDropDown.setAttribute('data-state','clicked')
        userDropDown.style.cssText = "visibility: visible; opacity: 1"
        return
    }
})

moreOptions.addEventListener('click',function(){
    let event_ini = moreOptions.getAttribute('data-state')
    if(!moreOptionDropDown.contains(event.target)){
        if(event_ini === 'clicked'){
            moreOptions.setAttribute('data-state','unclicked')
            moreOptionDropDown.removeAttribute('style')
            return
        }
    }
    if(event_ini === 'unclicked'){
        moreOptions.setAttribute('data-state','clicked')
        moreOptionDropDown.style.cssText = 'visibility: visible; opacity: 1'
    }
})

document.body.addEventListener('click',function(e){
    if(!userHandler.contains(e.target)){
        userDropDown.setAttribute('data-state','unclicked')
        userDropDown.removeAttribute('style')
    }
    if(!moreOptions.contains(e.target)){
        moreOptions.setAttribute('data-state','unclicked')
        moreOptionDropDown.removeAttribute('style')
    }
})