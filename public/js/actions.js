const btns = document.querySelectorAll(".sendbtn");

btns.forEach(b => {
    b.addEventListener("click", e => e.target.setAttribute("disabled", "true"));
});