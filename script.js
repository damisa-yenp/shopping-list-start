const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorge();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate Input
    if (newItem === '') {
        alert('please add an item');
        return;
    }

    //Create item dow element
    addItemToDOM(newItem);

    //Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    //Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //Add li to the DOM
    itemList.appendChild(li);
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemFromStorage = getItemFromStorge()

    //Add new item to array
    itemFromStorage.push(item);

    // Covert to JSOn string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemsFromStorge() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('item'));
    }

    return itemsFromStorage
}



function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}



function removeItem(item) {
    if (confirm('Are you sure?')) {
        //Remove item from Dom
        item.remove();

        //Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorge();

    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);


    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function clearItem() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    //Clear from localStorage
    localStorage.removeItem('items');

    checkUI()
}

function fiterItem(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//Initialize app
function init() {
    //Event Listenners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItem);
    itemFilter.addEventListener('input', fiterItem);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();