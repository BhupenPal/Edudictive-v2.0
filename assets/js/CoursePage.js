function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        )
    }

        function amountscrolled(){
        var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
        var docheight = getDocHeight()
        var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        var trackLength = docheight - winheight
        var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
        let courseBox = document.querySelector(".courseBox")
        if(pctScrolled >= 62){
            courseBox.style.cssText = `position: absolute; transform: translateY(${62+77}%)`
        } else {
            courseBox.removeAttribute("style")
        }
    }
    
    window.addEventListener("scroll", function(){
        amountscrolled()
    }, false)