// ==============================
// Cek Login
// ==============================

if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "index.html";
}

// ==============================
// Logout
// ==============================

function logout() {

    localStorage.removeItem("isLogin");
    localStorage.removeItem("namaUser");

    window.location.href = "index.html";

}

// ==============================
// Database Gudang
// ==============================

let dataGudang =
JSON.parse(localStorage.getItem("dataGudang")) || [];

// ==============================
// Simpan Gudang
// ==============================

function simpanGudang(){

    let nama =
    document.getElementById("namaGudang").value.trim();

    let lokasi =
    document.getElementById("lokasiGudang").value.trim();

    let kapasitas =
    document.getElementById("kapasitasGudang").value;

    if(nama==="" || lokasi==="" || kapasitas===""){

        alert("Lengkapi semua data!");

        return;

    }

    dataGudang.push({

        id:Date.now(),

        nama,

        lokasi,

        kapasitas:Number(kapasitas)

    });

    localStorage.setItem(

        "dataGudang",

        JSON.stringify(dataGudang)

    );

    resetForm();

    tampilkanGudang();

}

// ==============================
// Reset Form
// ==============================

function resetForm(){

document.getElementById("namaGudang").value="";

document.getElementById("lokasiGudang").value="";

document.getElementById("kapasitasGudang").value="";

}

// ==============================
// Tampilkan Gudang
// ==============================

function tampilkanGudang(){

let tbody =
document.getElementById("tabelGudang");

tbody.innerHTML="";

dataGudang.forEach(item=>{

tbody.innerHTML +=`

<tr>

<td>${item.nama}</td>

<td>${item.lokasi}</td>

<td>${item.kapasitas} Ton</td>

<td>

<button
class="edit-btn"
onclick="editGudang(${item.id})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="hapusGudang(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

}

// ==============================
// Hapus Gudang
// ==============================

function hapusGudang(id){

if(confirm("Hapus data gudang ini?")){

dataGudang =
dataGudang.filter(item=>item.id!==id);

localStorage.setItem(

"dataGudang",

JSON.stringify(dataGudang)

);

tampilkanGudang();

}

}

// ==============================
// Edit Gudang
// ==============================

function editGudang(id){

let item =
dataGudang.find(x=>x.id===id);

document.getElementById("namaGudang").value =
item.nama;

document.getElementById("lokasiGudang").value =
item.lokasi;

document.getElementById("kapasitasGudang").value =
item.kapasitas;

hapusGudang(id);

}

// ==============================
// Search Gudang
// ==============================

function cariGudang(){

let keyword =
document.getElementById("searchGudang")
.value
.toLowerCase();

let tbody =
document.getElementById("tabelGudang");

tbody.innerHTML="";

dataGudang

.filter(item=>

item.nama.toLowerCase().includes(keyword) ||

item.lokasi.toLowerCase().includes(keyword)

)

.forEach(item=>{

tbody.innerHTML +=`

<tr>

<td>${item.nama}</td>

<td>${item.lokasi}</td>

<td>${item.kapasitas} Ton</td>

<td>

<button
class="edit-btn"
onclick="editGudang(${item.id})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="hapusGudang(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

}

// ==============================

tampilkanGudang();