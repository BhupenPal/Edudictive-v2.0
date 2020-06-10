if (urlCheck(['register'])) {
  const FormElement = document.getElementById("user-register-form");
  preventer(FormElement, Ajax);
  function Ajax() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/user/register", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.getResponseHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onerror = function () {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "COULD NOT CONNECT TO THE SERVER",
        showConfirmButton: false,
        showCancelButton: true,
        timer: 2500,
      });
    };
    xhr.onload = function () {
      if (this.status === 200) {
        let data = JSON.parse(this.response);
        console.log(data);
        if (data.news[0] == "Email Sent") {
          let timerInterval;
          Swal.fire({
            icon: "success",
            title: "Auto close alert!",
            html: "You will be redirected to login page in <b>5</b> seconds.",
            timer: 5000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                  const b = content.querySelector("b");
                  if (b) {
                    b.textContent = parseInt(Swal.getTimerLeft() / 1000);
                  }
                }
              }, 1000);
            },
            onClose: () => {
              clearInterval(timerInterval);
            },
          }).then(() => {
            window.location.href = "/user/login";
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: data.news[0],
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "COULD NOT CONNECT TO THE SERVER",
          showConfirmButton: false,
          showCancelButton: true,
          timer: 2500,
        });
      }
    };
    xhr.send(getFields(FormElement));
  }
}

if (urlCheck(["login"])) {
  const FormElement = document.getElementById("user-login-form");
  preventer(FormElement, Ajax);
  function Ajax() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/user/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.getResponseHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function () {
      if (this.status === 200) {
        console.log(this.response);
        if (this.response == "Login Success") {
          window.location.replace(document.referrer);
        }
      } else {
        console.log("ERROR: AJAX COULD NOT CONNECT");
      }
    };
    xhr.send(getFields(FormElement));
  }
}

const addToCartButton = document.getElementById("add-to-cart");
if(urlCheck(["cart"])){
  addToCartButton.addEventListener("click", (e) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/to-cart/id", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("added to cart");
        addToCartButton.disabled = true;
      } else {
        console.log("cannot add to cart");
      }
    };
    xhr.send();
  });
}