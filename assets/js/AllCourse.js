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
    }

}