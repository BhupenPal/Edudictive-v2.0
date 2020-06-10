function eventini(x){
    let pretext = document.querySelector(".rd_pretext")
    let posttext = document.querySelector(".rd_aftrtext")
    if(x.innerHTML == "Know More"){
        pretext.style.visibility = "hidden"
        pretext.style.opacity = "0"
        posttext.style.height = "100%"
        posttext.style.width = "50%"
        posttext.style.visibility = "visible"
        posttext.style.opacity = "1"
        posttext.style.top = "0"
        for(var el=0; el<posttext.children.length ; el++){
            posttext.children[el].style.opacity = "0";
        }
        setTimeout(function(){
            for(var el=0; el<posttext.children.length ; el++){
                posttext.children[el].style.opacity = "1";
            }
        },600)
    }
    else{
        for(var el=0; el<posttext.children.length ; el++){
            posttext.children[el].style.opacity = "0";
        }
        posttext.style.height = "0%"
        posttext.style.width = "0%"
        posttext.style.top = "100%"
        posttext.style.opacity = "0"
        posttext.style.visibility = "hidden"
        setTimeout(function(){
            for(var el=0; el<posttext.children.length ; el++){
                posttext.children[el].style.opacity = "1";
            }
        },600)
        setTimeout(function(){
            pretext.style.visibility = "visible"
        pretext.style.opacity = "1"
        },200)
    }
}