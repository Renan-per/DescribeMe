newImg()
loadImg()
loadData()

const preload = [];

async function newImg() {
    const resposta = await fetch('https://picsum.photos/1920/1080');
    const url = await resposta.url;
    preload.push(url);
    return url;
}

async function loadImg() {
    const imgtag = document.querySelector(".container-img img");
    if (imgtag !== ""){
    const url = await newImg();
    imgtag.src = url;
    }
}

const sections = document.querySelectorAll(".section");
const headerButtons = document.querySelectorAll('header button')

function findVisibleSection() {
    return [...sections].find(section => !section.classList.contains('hide'));
}

headerButtons.forEach((btn, btnIndex) => {
    btn.addEventListener('click', () => {
        if (sections[btnIndex].classList.contains('hide')) {;
            findVisibleSection().classList.add('hide');
            sections[btnIndex].classList.remove('hide');
        };
    });
});  

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() +1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes()

function salvarDados () {
    const textarea = document.getElementById('txtbox');
    const src = document.querySelector(".container-img img").src;
    const content = textarea.value;
    
    if (content !== "") {        
        const boxClass = {
            "img" : src,
            "p" : content,
        }

        const list = JSON.parse(localStorage.getItem('box')) || [];

        list.push(boxClass);

        const jsonString = JSON.stringify(list);

        localStorage.setItem('box', jsonString);
        textarea.value = "";

        loadData();
        loadImg();
    }
}

function boxesCounter () {
    const boxesNumber = document.getElementById('boxes-list').querySelectorAll('div').length;
    const text = document.querySelector("#saved-notes h1");

    text.textContent = boxesNumber + " Saved Descriptions";
}

function loadData () {
    if (localStorage.getItem('box') !== null){
    const list = JSON.parse(localStorage.getItem('box'));

    const boxesList = document.getElementById('boxes-list');

    boxesList.innerHTML = "";

    list.forEach(value => {
        const box = document.createElement('div');
        box.classList.add('box');
        const img = document.createElement('img');
        img.src = value.img;
        const p = document.createElement('p');
        p.textContent = value.p;
        const button = document.createElement('button');
        button.classList.add('box-delete-btn');
        button.classList.add('hide');
        button.onclick = confirmAction;
        button.innerHTML = `<i class="bi bi-trash"></i>`;

        box.append(img);
        box.append(p);
        box.append(button);

        boxesList.append(box);
        
        boxesCounter ();
    });};};
    
let boxPTemporary;
let boxEditingIndex;

function confirmAction () {
    box.forEach((div, index) => {
        div.addEventListener('click', function(event) {
            document.querySelector(".confirm-overlay").classList.remove("hide");
            boxEditingIndex = index;
            let box = event.target.closest('.box');
            boxPTemporary = box;
        })
});};

function cancelDelete() {
    document.querySelector(".confirm-overlay").classList.add("hide");
}


function deleteBox () {
    boxPTemporary.remove();
        const savedData = localStorage.getItem('box');
        const list = JSON.parse(savedData);
        list.splice(boxEditingIndex, 1);
        localStorage.setItem('box', JSON.stringify(list));
        document.querySelector(".confirm-overlay").classList.add("hide");
        boxesCounter();
    };

const box = document.querySelectorAll('.box');

function optionsButton ()  {
    box.forEach((btn) => {
        btn.addEventListener('mouseover', function(event) {
            const button = event.currentTarget.querySelector('.box-delete-btn');
            button.classList.remove('hide');
        });
        btn.addEventListener('mouseout', function(event) {
            const button = event.currentTarget.querySelector('.box-delete-btn');
            button.classList.add('hide');
        });
    })};

function loadEditData() {
    box.forEach((div, index) => {
        div.addEventListener('click', function(event) {
            const box = event.target.closest('.box');
            boxPTemporary = box.querySelector('p');
            boxEditingIndex = index;
            const boxImg = box.querySelector('img');
            if (event.target.closest('.box-delete-btn')) {
                return;
            }
            const editImg = document.querySelector(".edit-div img");
            editImg.src = boxImg.src;
            const editTxtarea = document.querySelector(".edit-div textarea");
            editTxtarea.value = box.textContent
            editTxtarea.textContent = box.textContent; 
            document.querySelector(".edit-container").classList.remove("hide");
        });
});};

function saveEditBtn () {
    const editTxtarea = document.querySelector(".edit-div textarea");
    if (editTxtarea.value !== boxPTemporary.textContent) {
        boxPTemporary.textContent = editTxtarea.value;
        const savedData = localStorage.getItem('box');
        const list = JSON.parse(savedData);
        list[boxEditingIndex].p = editTxtarea.value;
        localStorage.setItem('box', JSON.stringify(list));
    };

    document.querySelector(".edit-container").classList.add("hide");
};

function closeEditBtn () {
    document.querySelector(".edit-container").classList.add("hide");
}

optionsButton();
loadEditData();