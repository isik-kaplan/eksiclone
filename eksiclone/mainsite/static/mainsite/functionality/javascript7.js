console.log(document.querySelector("#svg-dots"))

console.log(document.querySelectorAll("#svg-dots"))

document.querySelectorAll("#svg-dots").forEach(el => {
    el.addEventListener('click', e => {
        e.target.parentElement.nextElementSibling.classList.toggle('open')
    })
})