async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    document.getElementById('cat-fact').innerText = data.fact;
}

const blackHole = document.getElementById("black-hole");
const boxes = document.querySelectorAll(".draggable");
let hiddenBoxes = [];

boxes.forEach(box => {
    box.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });
});

blackHole.addEventListener("dragover", (e) => {
    e.preventDefault();
});

blackHole.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const box = document.getElementById(id);
    hiddenBoxes.push(box);
    const rect = blackHole.getBoundingClientRect();
    box.style.position = "absolute";
    box.style.left = `${rect.left + rect.width / 2 - 50}px`;
    box.style.top = `${rect.top + rect.height / 2 - 50}px`;
    box.classList.add("sucked-in");
    setTimeout(() => box.style.display = "none", 3000);
});

function restoreObjects() {
    hiddenBoxes.forEach(box => {
        box.style.display = "flex";
        box.classList.remove("sucked-in");
    });
    hiddenBoxes = [];
}
