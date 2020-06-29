/* COURSE ROTATION */
let gradients = [
  "linear-gradient(180deg, #6A11CB 0%, #2575FC 100%)",
  "transparent linear-gradient(180deg, #30CFD0 0%, #330867 100%)",
  "transparent linear-gradient(180deg, #453A94 0%, #F43B47 100%)",
  "transparent linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%)",
  "transparent linear-gradient(180deg, #FF0844 0%, #FFB199 100%)",
  "transparent linear-gradient(180deg, #453A94 50%,#F43B47 100%)",
  "transparent linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%)",
  "transparent linear-gradient(180deg, #30CFD0 0%, #330867 100%)",
];

let courseCards = document.getElementsByClassName("crs_card");

for (var index = 0; index < courseCards.length; index++) {
  courseCards[index].style.background = gradients[index];
}

function SlideRightPlease(x) {
  var crsWrap = x.parentElement;

  let cptcrsTech = document.querySelectorAll(
    ".tech_crs .crs_card_wrap .crs_card"
  );
  let cptcrsNontech = document.querySelectorAll(
    ".non_tech_crs .crs_card_wrap .crs_card"
  );

  if (crsWrap.parentElement.classList.contains("tech_crs")) {
    for (var i = 0; i < cptcrsTech.length; i++) {
      if (cptcrsTech[i].classList.contains("crs_hig") && i < 3) {
        cptcrsTech[i].classList.remove("crs_hig");
        cptcrsTech[i + 1].classList.add("crs_hig");
        break;
      }
    }
    cptcrsTech.item(3).classList.remove("crs_non_hig");
    cptcrsTech.item(0).classList.add("crs_non_hig");

    if (cptcrsTech[0].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_lft")[0].style.display = "none";
    } else {
      document.getElementsByClassName("sld_lft")[0].style.display = "flex";
    }

    if (cptcrsTech[3].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_rgt")[0].style.display = "none";
    } else {
      document.getElementsByClassName("sld_rgt")[0].style.display = "flex";
    }
  }

  if (crsWrap.parentElement.classList.contains("non_tech_crs")) {
    for (var i = 0; i < cptcrsNontech.length; i++) {
      if (cptcrsNontech[i].classList.contains("crs_hig") && i < 3) {
        cptcrsNontech[i].classList.remove("crs_hig");
        cptcrsNontech[i + 1].classList.add("crs_hig");
        crsWrap.scrollTo(1800, 0);
        break;
      }
    }
    cptcrsNontech.item(3).classList.remove("crs_non_hig");
    cptcrsNontech.item(0).classList.add("crs_non_hig");

    if (cptcrsNontech[0].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_lft")[1].style.display = "none";
    } else {
      document.getElementsByClassName("sld_lft")[1].style.display = "flex";
    }

    if (cptcrsNontech[3].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_rgt")[1].style.display = "none";
    } else {
      document.getElementsByClassName("sld_rgt")[1].style.display = "flex";
    }
  }
  
  function scroller(){
    crsWrap.scrollTo(1800, 0);
  }

  setTimeout(scroller,100)
}


function SlideLeftPlease(x) {
  var crsWrap = x.parentElement;
  crsWrap.scrollTo(-500, 0);

  let cptcrsTech = document.querySelectorAll(
    ".tech_crs .crs_card_wrap .crs_card"
  );
  let cptcrsNontech = document.querySelectorAll(
    ".non_tech_crs .crs_card_wrap .crs_card"
  );

  if (crsWrap.parentElement.classList.contains("tech_crs")) {
    for (var i = 3; i < cptcrsTech.length; i--) {
      if (cptcrsTech[i].classList.contains("crs_hig") && i > 0) {
        cptcrsTech[i].classList.remove("crs_hig");
        cptcrsTech[i - 1].classList.add("crs_hig");
        break;
      }
    }
    cptcrsTech.item(0).classList.remove("crs_non_hig");
    cptcrsTech.item(3).classList.add("crs_non_hig");

    if (cptcrsTech[0].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_lft")[0].style.display = "none";
    } else {
      document.getElementsByClassName("sld_lft")[0].style.display = "flex";
    }

    if (cptcrsTech[3].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_rgt")[0].style.display = "none";
    } else {
      document.getElementsByClassName("sld_rgt")[0].style.display = "flex";
    }
  }

  if (crsWrap.parentElement.classList.contains("non_tech_crs")) {
    for (var i = 3; i < cptcrsNontech.length; i--) {
      if (cptcrsNontech[i].classList.contains("crs_hig") && i > 0) {
        cptcrsNontech[i].classList.remove("crs_hig");
        cptcrsNontech[i - 1].classList.add("crs_hig");
        break;
      }
    }
    cptcrsNontech.item(0).classList.remove("crs_non_hig");
    cptcrsNontech.item(3).classList.add("crs_non_hig");

    if (cptcrsNontech[0].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_lft")[1].style.display = "none";
    } else {
      document.getElementsByClassName("sld_lft")[1].style.display = "flex";
    }

    if (cptcrsNontech[3].classList.contains("crs_hig")) {
      document.getElementsByClassName("sld_rgt")[1].style.display = "none";
    } else {
      document.getElementsByClassName("sld_rgt")[1].style.display = "flex";
    }
  }
  crsWrap.scrollTo(-1800, 0);
}

function hamoperation(x) {
  x.classList.toggle("change");
  let hammenu = document.querySelector(".ham-menu");

  if (x.classList.contains("change")) {
    hammenu.style.visibility = "visible";
    hammenu.style.opacity = "1";
  } else {
    hammenu.removeAttribute("style");
  }
}

const LinkHandle = (URL, NewWindow) => {
  if (NewWindow == "blank") {
    window.open(URL);
  } else {
    window.location.href = URL;
  }
};

// Psuedo Selector Styling
(function () {
  HTMLElement.prototype.pseudoStyle = function (d, e, f, diff) {
    var g = "pseudoStyles";
    var h = document.head || document.getElementsByTagName("head")[0];
    var i = document.getElementById(g) || document.createElement("style");
    i.id = g;
    var j = `pseudoStyle${diff}`;
    this.className += " " + j;
    i.innerHTML += " ." + j + ":" + d + "{" + e + ":" + f + "}";
    if(h.contains(i)){
      return this;
    }else{
      h.appendChild(i);
    }
    return this;
  };
})();
let x = document.querySelector(".user-cntr_pane");
let y = document.querySelector(".cntrl_sett");

// Psuedo Selector Styling

function acccontrol() {
  let accountImg = document.getElementById("cntrl_img").children[0];
  var svgel = document.querySelector("#cntrl_img");

  if (x.classList.contains("active_accopt") == false) {
    y.style.visibility = "visible";
    x.pseudoStyle("after", "visibility", "visible", "account").pseudoStyle(
      "after",
      "opacity",
      "1",
      "account"
    );
    y.style.opacity = "1";
    x.classList.add("active_accopt");
    svgel.style.filter =
      "invert(.4) brightness(1) sepia(1) saturate(5) hue-rotate(175deg)";
  } else {
    y.style.visibility = "hidden";
    x.pseudoStyle("after", "visibility", "hidden", "account").pseudoStyle(
      "after",
      "opacity",
      "0",
      "account"
    );
    y.style.opacity = "0";
    x.classList.remove("active_accopt");
    svgel.removeAttribute("style");
  }
}

document.addEventListener("mouseup", function (e) {
  let accountImg = document.getElementById("cntrl_img").children[0];
  var container = document.querySelector("#cntrl_img");
  let x = document.querySelector(".user-cntr_pane");
  let y = document.querySelector(".cntrl_sett");
  if (!container.contains(e.target)) {
    if (!y.contains(e.target)) {
      y.style.visibility = "hidden";
      x.pseudoStyle("after", "visibility", "hidden", "account").pseudoStyle(
        "after",
        "opacity",
        "0",
        "account"
      );
      y.style.opacity = "0";
      x.classList.remove("active_accopt");
      container.removeAttribute("style");
    }
  }
});

let program_menu = document.querySelector(".prog_menu");
let prog_opt = document.querySelector(".prog-menu");

function programs() {
  if (program_menu.classList.contains("active_prog") == false) {
    prog_opt.style.visibility = "visible";
    program_menu
      .pseudoStyle("after", "visibility", "visible", "programs")
      .pseudoStyle("after", "opacity", "1", "programs");
    prog_opt.style.opacity = "1";
    program_menu.classList.add("active_prog");
  } else {
    prog_opt.style.visibility = "hidden";
    prog_opt.style.opacity = "0";
    program_menu
      .pseudoStyle("after", "visibility", "hidden", "programs")
      .pseudoStyle("after", "opacity", "0", "programs");
    program_menu.classList.remove("active_prog");
  }
}

document.addEventListener("mouseup", function (e) {
  var container = document.querySelector(".prog_menu");
  if (!container.contains(e.target)) {
    if (!prog_opt.contains(e.target)) {
      prog_opt.style.visibility = "hidden";
      program_menu
        .pseudoStyle("after", "visibility", "hidden", "programs")
        .pseudoStyle("after", "opacity", "0", "programs");
      prog_opt.style.opacity = "0";
      program_menu.classList.remove("active_prog");
    }
  }
});

/* AJAX HANDLER */
function getFields(FormElement) {
  let reqBody = {};
  Object.keys(FormElement.elements).forEach((key) => {
    let element = FormElement.elements[key];
    if (element.type !== "submit") {
      reqBody[element.name] = element.value;
    }
  });
  return JSON.stringify(reqBody);
}

function preventer(FormElement, CallBack) {
  FormElement.addEventListener("submit", () => {
    event.preventDefault();
    CallBack();
  });
}

function urlCheck(ToCheck) {
  let flag = false;
  ToCheck.map( x => {
    if (window.location.href.indexOf(x) > -1){
      flag =  true;
    }
  })
  return flag;
}

/* AJAX HANDLER */
if (urlCheck(["programs", "events", "about-us", "contact-us"])) {
  const FormElement = document.getElementById("contactForm");
  preventer(FormElement, Ajax);
  function Ajax() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact-us", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.getResponseHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function () {
      if (this.status === 200) {
        console.log(this.response);
        animatedsub();
        if (this.response == "Done") {
          console.log('Done')
        }
      } else {
        console.log("ERROR: AJAX COULD NOT CONNECT");
      }
    };
    xhr.send(getFields(FormElement));
  }
}

function animatedsub(){
  let _markup1 = document.querySelector(".qry-enter-data")
  let _markup2 = document.querySelector(".success-submission")

  _markup1.animate([
    {
      transform: 'translateX(0px)',
      opacity: 1,
      visibility: 'visible'
    },
    {
      transform: 'translateX(-10rem)',
      opacity: 0,
      visibility: 'hidden'
    }
  ],{
    duration: 500,
    iterations: 1,
    fill: "forwards"
  })

 setTimeout(function(){
  _markup2.animate([
    {
      transform: 'translateX(10rem)',
      opacity: 0,
      visibility: 'hidden'
    },
    {
      transform: 'translateX(0rem)',
      opacity: 1,
      visibility: 'visible'
    }
  ],{
    duration: 500,
    iterations: 1,
    fill: "forwards"
  })
 },500)
}
