document.querySelectorAll("#svg-dots").forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentElement.nextElementSibling.classList.toggle('open')
    })
})