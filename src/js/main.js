async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    document.getElementById('cat-fact').innerText = data.fact;
}

const blackHole = document.getElementById("black-hole");
const boxes = document.querySelectorAll(".draggable");
let hiddenBoxes = [];
let originalPositions = {};

boxes.forEach(box => {
    const computedStyle = getComputedStyle(box);
    originalPositions[box.id] = { 
        left: computedStyle.left, 
        top: computedStyle.top 
    };
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
    box.style.position = "absolute";
    box.style.left = "50%";
    box.style.top = "50%";
    box.style.transform = "translate(-50%, -50%)";
    box.classList.add("sucked-in");
    setTimeout(() => box.style.display = "none", 3000);
});

function restoreObjects() {
    hiddenBoxes.forEach(box => {
        box.style.display = "flex";
        box.style.opacity = "1";
        box.style.transform = "none";
        box.style.left = originalPositions[box.id].left;
        box.style.top = originalPositions[box.id].top;
        box.classList.remove("sucked-in");
    });
    hiddenBoxes = [];
}
