// ===============================
// Cek Login
// ===============================

if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "index.html";
}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("isLogin");

    localStorage.removeItem("namaUser");

    window.location.href = "index.html";

}

// ===============================
// Ambil Data LocalStorage
// ===============================

let dataStok =
JSON.parse(localStorage.getItem("stokPangan")) || [];

// ===============================
// Simpan Data
// ===============================

function simpanStok(){

    let nama =
    document.getElementById("namaBarang").value;

    let kategori =
    document.getElementById("kategori").value;

    let jumlah =
    document.getElementById("jumlah").value;

    let jenis =
    document.getElementById("jenis").value;

    let tanggal =
    document.getElementById("tanggal").value;

    if(
        nama==="" ||
        jumlah==="" ||
        tanggal==="")
    {

        alert("Lengkapi semua data!");

        return;

    }

    dataStok.push({

        id:Date.now(),

        nama,

        kategori,

        jumlah:Number(jumlah),

        jenis,

        tanggal

    });

    localStorage.setItem(
        "stokPangan",
        JSON.stringify(dataStok)
    );

    resetForm();

    tampilkanData();

}

// ===============================
// Reset Form
// ===============================

function resetForm(){

document.getElementById("namaBarang").value="";

document.getElementById("jumlah").value="";

document.getElementById("tanggal").value="";

}

// ===============================
// Tampilkan Data
// ===============================

function tampilkanData(){

let tbody =
document.getElementById("tabelStok");

tbody.innerHTML="";

dataStok.forEach((item)=>{

tbody.innerHTML +=`

<tr>

<td>${item.nama}</td>

<td>${item.kategori}</td>

<td>${item.jumlah} Ton</td>

<td>${item.jenis}</td>

<td>${item.tanggal}</td>

<td>

<button
class="edit-btn"
onclick="editData(${item.id})">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="hapusData(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

}

// ===============================
// Hapus
// ===============================

function hapusData(id){

if(confirm("Hapus data ini?")){

dataStok =
dataStok.filter(item=>item.id!==id);

localStorage.setItem(
"stokPangan",
JSON.stringify(dataStok)
);

tampilkanData();

}

}

// ===============================
// Edit
// ===============================

function editData(id){

let item =
dataStok.find(x=>x.id===id);

document.getElementById("namaBarang").value =
item.nama;

document.getElementById("kategori").value =
item.kategori;

document.getElementById("jumlah").value =
item.jumlah;

document.getElementById("jenis").value =
item.jenis;

document.getElementById("tanggal").value =
item.tanggal;

hapusData(id);

}

// ===============================

tampilkanData();
// ===============================
// SEARCH DATA
// ===============================

function cariData(){

let keyword =
document.getElementById("search")
.value
.toLowerCase();

let tbody =
document.getElementById("tabelStok");

tbody.innerHTML="";

dataStok

.filter(item=>

item.nama
.toLowerCase()
.includes(keyword)

)

.forEach(item=>{

let aksi=`

<button onclick="editData(${item.id})">

✏️ Edit

</button>

<button onclick="hapusData(${item.id})">

🗑️ Hapus

</button>

`;

tbody.innerHTML+=`

<tr>

<td>${item.nama}</td>

<td>${item.kategori}</td>

<td>${item.jumlah} Ton</td>

<td>${item.jenis}</td>

<td>${item.tanggal}</td>

<td>${aksi}</td>

</tr>

`;

});

}