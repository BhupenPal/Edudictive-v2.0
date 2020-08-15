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
    var pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    let courseBox = document.querySelector(".courseBox")
    if (pctScrolled >= 62) {
        courseBox.style.cssText = `position: absolute; top: 116.5%`
    } else {
        courseBox.removeAttribute("style")
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