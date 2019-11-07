const hiddenInput = document.querySelector("#hiddenInput");
const emailInput = document.querySelector(".ql-editor");


emailInput.oninput = (e) => {
    hiddenInput.value = e.target.innerHTML;
}

