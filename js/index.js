let itemName = document.querySelector('#itemName');
let alertMsg = document.querySelector('#alertMsg');
let closeIcon = document.querySelector('#close');
let searchInput = document.querySelector('#searchInput');
let itemList = [];
let currentIndex;

itemList = JSON.parse(localStorage.getItem("itemsList")) || [];
addItem();

itemName.nextElementSibling.addEventListener("click" , createItem);

closeIcon.addEventListener("click" , function(){
    alertMsg.closest(".alertContainer").classList.add("d-none");
    document.body.querySelector(".page").style.cssText = "filter: blur(0px)";
})


itemName.nextElementSibling.nextElementSibling.addEventListener("click" , UpdateItem);

searchInput.addEventListener("input" , searchItem);


function createItem(){
    if(!checkInput()){
        if(!checkAva()){
            let myItem = {
                name: itemName.value,
            }
            itemList.push(myItem);
            localStorage.setItem("itemsList" , JSON.stringify(itemList));
            addItem();
            clearForm();
            Toastify({
                text: "item created succsefully",
                duration: 1000,
                style:{
                    background:'#ff6723',
                },
            }).showToast();
        }
    }
}


function addItem(){
    let itemHtml = '';
    for(let i = 0; i < itemList.length; i++){
        itemHtml += `<tr> 
        <td>${i+1}</td>
        <td>${itemList[i].name}</td>
        <td><button onclick = "deleteItem(${i})" class="btn btn-outline-danger">Delete</button></td>
        <td><button onclick = "upItem(${i})" class="btn btn-outline-success">Update</button></td>
        </tr>`;
    }
    document.querySelector("#data").innerHTML = itemHtml;
}


function checkInput(){
    if(itemName.value == ""){
        showAlert("you should add value in input");
        document.body.querySelector(".page").style.cssText = "filter: blur(10px)";
        return true;
    }
}


function checkAva(){
    for(let i = 0; i < itemList.length; i++){
        if(itemName.value.toLowerCase() == itemList[i].name.toLowerCase()){
            document.body.querySelector(".page").style.cssText = "filter: blur(10px)";
            showAlert("this item is already exist");
            return true;
        }
    }
}


function deleteItem(i){
    itemList.splice(i , 1);
    localStorage.setItem("itemsList" , JSON.stringify(itemList));
    addItem();
    Toastify({
        text: "item deleted succsefully",
        duration: 1000,
        style:{
            background:'#ff6723',
        },
    }).showToast();
}


function upItem(i){
    itemName.value = itemList[i].name; 
    itemName.nextElementSibling.classList.add("d-none");
    itemName.nextElementSibling.nextElementSibling.classList.remove("d-none");
    currentIndex = i;
}

function UpdateItem(){
    itemList[currentIndex].name = itemName.value;
    itemName.nextElementSibling.classList.remove("d-none");
    itemName.nextElementSibling.nextElementSibling.classList.add("d-none");
    localStorage.setItem("itemsList" , JSON.stringify(itemList));
    addItem();
    clearForm();
    Toastify({
        text: "item updated succsefully",
        duration: 1000,
        style:{
            background:'#ff6723',
        },
    }).showToast();
}

function searchItem(){
    itemHtml = "";
    for(let i = 0; i < itemList.length; i++){
        if(itemList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            itemHtml += `<tr> 
            <td>${i+1}</td>
            <td>${itemList[i].name}</td>
            <td><button onclick = "deleteItem(${i})" class="btn btn-outline-danger">Delete</button></td>
            <td><button onclick = "upItem(${i})" class="btn btn-outline-success">Update</button></td>
            </tr>`;
        }
    }
    document.querySelector("#data").innerHTML = itemHtml;
}


function clearForm(){
    itemName.value = '';
}

function showAlert(massege){
    alertMsg.closest(".alertContainer").classList.remove("d-none");
    alertMsg.innerHTML = massege;
}