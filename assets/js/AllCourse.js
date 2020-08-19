let ClassEnq = "";

const GradeSelector = (selected) => {
    const GradeDivs = document.querySelector('.sub-filter').children
    
    if (selected.innerHTML.includes('Grade')) {
        GradeDivs[0].style.border = '1px solid #fff'
        GradeDivs[1].style.border = '1px solid #fff'
        GradeDivs[2].style.border = '1px solid #fff'
        document.getElementsByClassName('main-filter')[0].classList.add("completePSAnchor")
        document.getElementsByClassName('main-filter')[1].classList.remove("completePSAnchor")
        selected.style.border = '1px solid #418AFA'
    } else {
        GradeDivs[0].style.border = '1px solid #707070'
        GradeDivs[1].style.border = '1px solid #707070'
        GradeDivs[2].style.border = '1px solid #707070'
        document.getElementsByClassName('main-filter')[0].classList.remove("completePSAnchor")
        document.getElementsByClassName('main-filter')[1].classList.add("completePSAnchor")
        ClassEnq='college'
    }

    Ajax()
}

function Ajax() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/course-filter?enquiry=${ClassEnq}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.getResponseHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (this.status === 200) {
            document.getElementsByClassName('CourseCardWrapper')[0].innerHTML = ''
            courseAdd(this.response)
        } else {
            console.log("ERROR: AJAX COULD NOT CONNECT");
        }
    };

    xhr.send();
}

function courseAdd(data) {
    const aRes = JSON.parse(data)
    let template = ''

    aRes.map((course, index) => {
        template +=     `<div id="CourseCard${index}" class="course-card" data-value="${index}">
        <div class="date-wishlist"><span>Starting ${course.StartDate}</span><span><img
                    onclick="heartanimate(this)" src="/assets/images/svgs/heart.svg" alt=""></span></div>
        <div class="course-name-wrapper">
            <span class="course-name">${course.Title}</span>
            <span class="course-mode">${course.Mode} Training Program</span>
        </div>
        <div class="ratings">
            <div class="rating-stars" data-rating="${course.Rating}">
            </div>
            <span>${course.Rating} (${course.TotalReview} Reviews)</span>
        </div>
        <div class="explore-course">
            <button onclick="LinkHandle('/course/${course.Key}/${course.Title}')">Learn More</button>
            <button onclick="LinkHandle('/course/${course.Key}/${course.Title}')">Register Now</button>
        </div>
    </div>`
    })

    document.getElementsByClassName('CourseCardWrapper')[0].innerHTML = template
}