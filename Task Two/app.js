const balance = document.getElementById("balance");

const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const listMinus = document.getElementById("list-minus");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const btnAdd = document.getElementById("btnAdd");
const btnMinus = document.getElementById("btnMinus");
let moodadd = "add";
let tmp;
let moodMinus = "minus";
let tmpM;
let data;
if (localStorage.addData != null) {
  data = JSON.parse(localStorage.addData);
} else {
  data = [];
}
// localStorage.clear();
btnAdd.onclick = function addTask(e) {
  e.preventDefault();
  if (text.value != "" && amount.value != "") {
    let listData = {
      text: text.value,
      amount: amount.value,
    };
    if (moodadd === "add") {
      data.push(listData);
    } else {
      data[tmp] = listData;
      moodadd = "add";
      btnAdd.innerHTML = "Add";
    }
    localStorage.setItem("addData", JSON.stringify(data));
    text.value = "";
    amount.value = "";
    showData();
    addBalance();
  }
};
// show data
function showData() {
  let li;
  for (let i = 0; i < data.length; i++) {
    li += `
    <li class="plus">
          ${data[i].text} <span>+$${data[i].amount}</span>
          <div class="edit">
            <i onclick="update(${i})" id="edit" class="fa-solid fa-pen-to-square"></i
            ><button onclick="deleteData(${i})" id="delete-it" class="delete-btn">X</button>
          </div>
        </li>
    `;
  }
  list.innerHTML = li;
}

let dataM;
if (localStorage.minusData != null) {
  dataM = JSON.parse(localStorage.minusData);
} else {
  dataM = [];
}
btnMinus.onclick = function minusTask(e) {
  e.preventDefault();
  if (text.value != "" && amount.value != "") {
    let listDataMinus = {
      text: text.value,
      amount: amount.value,
    };
    if (moodMinus === "minus") {
      dataM.push(listDataMinus);
    } else {
      dataM[tmpM] = listDataMinus;
      moodMinus = "minus";
      btnMinus.innerHTML = "Minus";
    }
    localStorage.setItem("minusData", JSON.stringify(dataM));
    text.value = "";
    amount.value = "";
    showDataMinus();
    minusBalance();
  }
};
// show data minus
function showDataMinus() {
  let liM;
  for (let i = 0; i < dataM.length; i++) {
    liM += `
    <li class="minus">
          ${dataM[i].text} <span>-$${dataM[i].amount}</span>
          <div class="edit">
            <i onclick='updateMinus(${i})' id="edit" class="fa-solid fa-pen-to-square"></i
            ><button onclick="deleteDataMinus(${i})" id="delete-it" class="delete-btn">X</button>
          </div>
        </li>
    `;
  }
  listMinus.innerHTML = liM;
}
function deleteData(i) {
  data.splice(i, 1);
  localStorage.addData = JSON.stringify(data);
  showData();
}
function update(i) {
  text.value = data[i].text;
  amount.value = data[i].amount;
  btnAdd.innerHTML = "Update";
  moodadd = "update";
  tmp = i;
}
function updateMinus(i) {
  text.value = dataM[i].text;
  amount.value = dataM[i].amount;
  btnMinus.innerHTML = "Update";
  moodMinus = "update";
  tmpM = i;
}
function deleteDataMinus(i) {
  dataM.splice(i, 1);
  localStorage.minusData = JSON.stringify(dataM);
  showDataMinus();
}
function addBalance() {
  for (let i = 0; i < data.length; i++) {
    balance.innerText = +balance.innerText + +data[i].amount;
    moneyPlus.innerText = +moneyPlus.innerText + +data[i].amount;
  }
}
function minusBalance() {
  for (let i = 0; i < dataM.length; i++) {
    balance.innerText = +balance.innerText - +dataM[i].amount;
    moneyMinus.innerText = +moneyMinus.innerText + +dataM[i].amount;
  }
}
showData();
showDataMinus();
addBalance();
minusBalance();
