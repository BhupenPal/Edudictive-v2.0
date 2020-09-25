function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

function amountscrolled() {
    var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var boxheight = document.getElementsByClassName("mainScreen")[0].clientHeight
    // var boxheightper = boxheight / trackLength * 100
    var headerheight = document.querySelector(".subHeader").clientHeight
    var pctScrolled = scrollTop
    let courseBox = document.querySelector(".courseBox")
    if(window.matchMedia("(min-width: 1900px)").matches){
        if (pctScrolled >= boxheight-55) {
            courseBox.style.cssText = `position: absolute; top: ${boxheight + headerheight + 12}px`
        } else {
            courseBox.removeAttribute("style")
        }
    } else {
        if (pctScrolled >= boxheight-40) {
            courseBox.style.cssText = `position: absolute; top: ${boxheight + headerheight + 12}px`
        } else {
            courseBox.removeAttribute("style")
        }
    }
}

window.addEventListener("scroll", function () {
    amountscrolled()
}, false)

const stripeHandler = StripeCheckout.configure({
    key: StripePublicKey,
    locale: 'auto',
    token: function(token) {
        fetch('/purchase-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                AMU,
                CourseKey
            })
        })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) { 
            console.log(data)
         })
    }
})

function BuyClicked() {
    stripeHandler.open({
        amount: AMU,
        currency: 'inr'
    })
}

function validate(){
    let BranchSelect = document.getElementsByName("selectCourse")
    let noValue = false;
    if(BranchSelect[0].value == '' && BranchSelect[1].value == ''){
        noValue = true;
    } else {
        noValue = false;
    }
    if(noValue){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please select a batch first",
            className: "SwalApperance",
            showConfirmButton: false,
            showCancelButton: true,
            timer: 10000000,
          });
    }
}