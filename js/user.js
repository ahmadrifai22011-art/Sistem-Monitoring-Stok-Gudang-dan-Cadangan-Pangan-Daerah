// =======================
// CEK LOGIN
// =======================

if(localStorage.getItem("isLogin")!=="true"){

window.location.href="index.html";

}

// =======================
// LOGOUT
// =======================

function logout(){

localStorage.removeItem("isLogin");

localStorage.removeItem("namaUser");

window.location.href="index.html";

}

// =======================
// DATABASE USER
// =======================

let users =
JSON.parse(localStorage.getItem("users")) || [];

// =======================
// SIMPAN USER
// =======================

function simpanUser(){

let nama =
document.getElementById("namaUserInput").value.trim();

let email =
document.getElementById("emailUser").value.trim();

let role =
document.getElementById("roleUser").value;

if(nama==="" || email===""){

alert("Lengkapi data!");

return;

}

users.push({

id:Date.now(),

nama,

email,

role

});

localStorage.setItem(

"users",

JSON.stringify(users)

);

resetForm();

tampilkanUser();

}

// =======================

function resetForm(){

document.getElementById("namaUserInput").value="";

document.getElementById("emailUser").value="";

}

// =======================

function tampilkanUser(){

let tbody =
document.getElementById("tabelUser");

tbody.innerHTML="";

users.forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.nama}</td>

<td>${item.email}</td>

<td>${item.role}</td>

<td>

<button class="edit-btn"
onclick="editUser(${item.id})">

✏️ Edit

</button>

<button class="delete-btn"
onclick="hapusUser(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

}

// =======================

function hapusUser(id){

if(confirm("Hapus user?")){

users =
users.filter(item=>item.id!==id);

localStorage.setItem(

"users",

JSON.stringify(users)

);

tampilkanUser();

}

}

// =======================

function editUser(id){

let item =
users.find(x=>x.id===id);

document.getElementById("namaUserInput").value =
item.nama;

document.getElementById("emailUser").value =
item.email;

document.getElementById("roleUser").value =
item.role;

hapusUser(id);

}

// =======================

function cariUser(){

let keyword =
document.getElementById("searchUser")
.value.toLowerCase();

let tbody =
document.getElementById("tabelUser");

tbody.innerHTML="";

users.filter(item=>

item.nama.toLowerCase().includes(keyword) ||

item.email.toLowerCase().includes(keyword)

).forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.nama}</td>

<td>${item.email}</td>

<td>${item.role}</td>

<td>

<button class="edit-btn"
onclick="editUser(${item.id})">

✏️ Edit

</button>

<button class="delete-btn"
onclick="hapusUser(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

}

// =======================

tampilkanUser();