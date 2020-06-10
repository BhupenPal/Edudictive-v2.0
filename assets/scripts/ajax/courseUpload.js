
const progressBarFill = document.getElementById("progress-bar-fill");
const progressBarText = document.getElementById("progress-bar-text");

const FormElement = document.getElementById("courseId");
preventer(FormElement, courseUpload);

function courseUpload() { 
 // document.getElementById("uploadFormSubmit").disabled = true;

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/user/add-course", true);

  xhr.upload.addEventListener("progress", (e) => {
    const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
    progressBarFill.style.width = percent.toFixed(2) + "%";
    progressBarText.textContent = percent.toFixed(2) + "%";
    progressBarText.style.left = "60%";
  });

  xhr.addEventListener("load", function () {
    document.body.style.cursor = "progress";
    if (xhr.status == 200) {
        if(this.response=="done"){
            console.log("course uploaded")
        }
    }
  });

  let PayLoad = new FormData(FormElement);
  xhr.send(PayLoad);
}
