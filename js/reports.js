// ==========================
// CEK LOGIN
// ==========================

if(localStorage.getItem("isLogin")!=="true"){

window.location.href="index.html";

}

// ==========================
// LOGOUT
// ==========================

function logout(){

localStorage.removeItem("isLogin");
localStorage.removeItem("namaUser");

window.location.href="index.html";

}

// ==========================
// DATA STOK
// ==========================

const stok=
JSON.parse(localStorage.getItem("stokPangan")) || [];

// ==========================
// TAMPILKAN LAPORAN
// ==========================

const tbody=
document.getElementById("laporanBody");

tbody.innerHTML="";

stok.forEach(item=>{

let status=
item.jumlah<100?
"Kritis":"Aman";

tbody.innerHTML+=`

<tr>

<td>${item.nama}</td>

<td>${item.kategori}</td>

<td>${item.jumlah} Ton</td>

<td>${item.jenis}</td>

<td>${item.tanggal}</td>

<td>${status}</td>

</tr>

`;

});

// ==========================
// EXPORT CSV
// ==========================

function downloadCSV(){

let csv=
"Komoditas,Kategori,Jumlah,Jenis,Tanggal,Status\n";

stok.forEach(item=>{

let status=
item.jumlah<100?
"Kritis":"Aman";

csv+=`${item.nama},${item.kategori},${item.jumlah},${item.jenis},${item.tanggal},${status}\n`;

});

const blob=
new Blob([csv],{type:"text/csv"});

const url=
window.URL.createObjectURL(blob);

const a=
document.createElement("a");

a.href=url;

a.download="laporan_stok.csv";

a.click();

window.URL.revokeObjectURL(url);

}