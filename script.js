newImg()
loadImg()
loadData()

const preload = [];

async function newImg() {
    const resposta = await fetch('https://picsum.photos/1920/1080');
    const url = await resposta.url;
    preload.push(url);
    console.log(preload);
    return url;
}

async function loadImg() {
    const imgtag = document.querySelector(".container-img img");
    if (imgtag !== ""){
    const url = await newImg();
    imgtag.src = url;
    }
}

function esconder () {
    document.getElementById("descrever").classList.remove("hide");
    document.getElementById("saved-notes").classList.add("hide");
}

function aparecer () {
    document.getElementById("saved-notes").classList.remove("hide");
    document.getElementById("descrever").classList.add("hide");
}

function salvarDados () {
    const textarea = document.getElementById('txtbox');
    const content = textarea.value;
    
    if (content !== "") {        
        const box = document.createElement('div');
        box.classList.add('box');
        const img = document.createElement('img');
        const imgtag = document.querySelector(".container-img img");
        const src = imgtag.src;
        img.src = src;

        const p = document.createElement('p');
        const button = document.createElement('button');
        button.classList.add('box-delete-btn');
        button.classList.add('hide');
        button.onclick = confirmAction;
        button.innerHTML = `<i class="bi bi-trash"></i>`;

        const boxesList = document.getElementById('boxes-list');
        boxesList.append(box);
        box.append(img);
        box.append(p);
        box.append(button);


        img.append(src);
        p.append(content);

        const boxClass = {
            "img" : src,
            "p" : content,
        }

        const list = JSON.parse(localStorage.getItem('box')) || [];

        list.push(boxClass);

        const jsonString = JSON.stringify(list);

        localStorage.setItem('box', jsonString);
        textarea.value = "";

        boxesCounter();
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
    const savedData = localStorage.getItem('box');
    const list = JSON.parse(savedData);

    list.forEach((value) => {
        console.log(value);
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
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>`;

        const boxesList = document.getElementById('boxes-list');

        boxesList.append(box);
        box.append(img);
        box.append(p);
        box.append(button);
        
        
        boxesCounter ();
    })};}
    
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

console.log(box)

box.forEach((btn) => {
    btn.addEventListener('mouseover', function(event) {
        const button = event.currentTarget.querySelector('.box-delete-btn');
        button.classList.remove('hide');
    });

        btn.addEventListener('mouseout', function(event) {
        const button = event.currentTarget.querySelector('.box-delete-btn');
        button.classList.add('hide');
    });
});

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
    // fazer a lógica de como ele vai pegar os dados novos da edição e salvar
    console.log(boxEditingIndex)
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

loadEditData();