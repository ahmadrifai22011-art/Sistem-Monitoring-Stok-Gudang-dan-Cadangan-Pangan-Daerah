// ==========================
// CEK LOGIN
// ==========================

if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "index.html";
}

// ==========================
// TAMPILKAN NAMA USER
// ==========================

document.getElementById("namaUser").textContent =
localStorage.getItem("namaUser") || "Administrator";

// ==========================
// AMBIL DATABASE
// ==========================

const stok = JSON.parse(localStorage.getItem("stokPangan")) || [];
const gudang = JSON.parse(localStorage.getItem("dataGudang")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];

// ==========================
// HITUNG DATA
// ==========================

let totalStok = 0;
let stokMasuk = 0;
let stokKeluar = 0;
let stokKritis = 0;

stok.forEach(item => {

    totalStok += Number(item.jumlah);

    if(item.jenis==="Stok Masuk"){
        stokMasuk += Number(item.jumlah);
    }

    if(item.jenis==="Stok Keluar"){
        stokKeluar += Number(item.jumlah);
    }

    if(item.jumlah<100){
        stokKritis++;
    }

});

// ==========================
// CARD DASHBOARD
// ==========================

document.getElementById("totalKomoditas").innerHTML = stok.length;

document.getElementById("totalGudang").innerHTML = gudang.length;

document.getElementById("totalStok").innerHTML = totalStok+" Ton";

document.getElementById("stokKritis").innerHTML = stokKritis;

document.getElementById("stokMasuk").innerHTML = stokMasuk+" Ton";

document.getElementById("stokKeluar").innerHTML = stokKeluar+" Ton";

// ==========================
// TABEL
// ==========================

const tbody =
document.getElementById("dashboardTable");

tbody.innerHTML="";

stok.slice().reverse().forEach(item=>{

let status =
item.jumlah<100 ?
"Kritis" :
"Aman";

tbody.innerHTML +=`

<tr>

<td>${item.nama}</td>

<td>${item.kategori}</td>

<td>${item.jumlah} Ton</td>

<td>

<span class="${
status==="Aman"?
"badge-success":
"badge-danger"
}">

${status}

</span>

</td>

</tr>

`;

});

// ==========================
// GRAFIK
// ==========================

const nama = stok.map(x=>x.nama);

const jumlah = stok.map(x=>x.jumlah);

new Chart(document.getElementById("chartStok"),{

type:"bar",

data:{

labels:nama,

datasets:[{

label:"Jumlah Stok",

data:jumlah,

borderWidth:1

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

},

scales:{

y:{
beginAtZero:true
}

}

}

});

// ==========================
// NOTIFIKASI
// ==========================

if(stokKritis>0){

setTimeout(()=>{

alert("⚠️ Terdapat "+stokKritis+" komoditas dengan stok kritis!");

},1000);

}

// ==========================

function logout(){

localStorage.removeItem("isLogin");

localStorage.removeItem("namaUser");

window.location.href="index.html";

}
//=========================
// NOTIFIKASI
//=========================

const notif =
document.getElementById("notifList");

notif.innerHTML="";

stok.forEach(item=>{

if(item.jumlah<100){

notif.innerHTML+=`

<li>

⚠️ ${item.nama} tersisa ${item.jumlah} Ton

</li>

`;

}

});

if(notif.innerHTML===""){

notif.innerHTML="<li>Semua stok dalam kondisi aman.</li>";

}