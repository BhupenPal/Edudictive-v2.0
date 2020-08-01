const GradeSelector = (selected) => {
    const GradeDivs = document.querySelector('.sub-filter').children
    
    if (selected.innerHTML.includes('Grade')) {
        GradeDivs[0].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        GradeDivs[1].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        GradeDivs[2].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        document.getElementsByClassName('main-filter')[0].style.border = '5px solid #418AFA'
        document.getElementsByClassName('main-filter')[1].style.border = '5px solid rgba(128, 128, 128, 0.76)'
        selected.style.border = '3px solid #418AFA'
    } else {
        GradeDivs[0].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        GradeDivs[1].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        GradeDivs[2].style.border = '3px solid rgba(128, 128, 128, 0.76)'
        document.getElementsByClassName('main-filter')[0].style.border = '5px solid rgba(128, 128, 128, 0.76)'
        document.getElementsByClassName('main-filter')[1].style.border = '5px solid #418AFA'
    }

}