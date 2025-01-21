document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde sahip bilgilerini getir
    getSahipBilgileri();
    getHayvanBilgileri();
    
  
    // Sahip Bilgileri sayfasına tıklandığında sahip bilgilerini getir
    document.getElementById('sahipBilgileri').addEventListener('click', function () {
      getSahipBilgileri();
    });
    // Hayvan Bilgileri sayfasına tıklandığında hayvan bilgilerini getir
     document.getElementById('hayvanBilgileri').addEventListener('click', function () {
        getHayvanBilgileri();
        getHayvanTuruVerileri()
    });
   
createVeterinerHaritasi();
   createPetshopHaritasi();
   createOtoparkHaritasi();
   createGemlikHaritasi();
   createYerHaritasi();
   
});

function getSahipBilgileri() {
    // JavaScript ile sunucudan veri çekme
    fetch('/api/sahip-bilgileri')
      .then(response => response.json())
      .then(data => {
        // Verileri işleyin ve HTML tabloya ekleyin
        const sahipTableBody = document.getElementById('sahipTableBody');
  
        // Tabloyu temizle
        sahipTableBody.innerHTML = '';
  
        // Verileri tabloya ekle
        data.forEach(sahip => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${sahip.sahip_id}</td>
            <td>${sahip.sahip_ad}</td>
            <td>${sahip.sahip_soyad}</td>
            <td>${sahip.mahalle_ad}</td>
          `;
          sahipTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Veri çekme hatası:', error));
  }
  document.addEventListener('DOMContentLoaded', function () {
    // Grafik için verileri al
    getMahalleVerileri();
});

function getMahalleVerileri() {
    // Sunucudan mahalle sayıları verilerini çek
    fetch('/api/mahalle-sayilari')
        .then(response => response.json())
        .then(data => {
            // Dairesel grafiği oluştur
            createMahalleGrafik(data);
        })
        .catch(error => console.error('Veri çekme hatası:', error));
}
function createMahalleGrafik(veriler) {
    var ctx = document.getElementById('mahalleGrafikCanvas').getContext('2d');
  
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: veriler.mahalleAdlari, // Mahalle adları
            datasets: [{
                data: veriler.mahalleSayilari, // Mahalle sayıları
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
            }],
        },
    });
  }
 

function getHayvanBilgileri() {
    // JavaScript ile sunucudan veri çekme
    fetch('/api/hayvan-bilgileri') // API endpoint'inizi değiştirin
        .then(response => response.json())
        .then(data => {
            // Verileri işleyin ve HTML tabloya ekleyin
            const hayvanTableBody = document.getElementById('hayvanTableBody');

            // Tabloyu temizle
            hayvanTableBody.innerHTML = '';

            // Verileri tabloya ekle
            data.forEach(hayvan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${hayvan.hayvan_id}</td>
                    <td>${hayvan.hayvan_ad}</td>
                    <td>${hayvan.hayvan_tur}</td>
                    <td>${hayvan.sahip_id}</td>
                    <td>${hayvan.sahip_ad}</td>
                    <td>${hayvan.sahip_soyad}</td>
                `;
                hayvanTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Veri çekme hatası:', error));
}


document.addEventListener('DOMContentLoaded', function () {
  // Grafik için verileri al
  getHayvanTuruVerileri();
});

function getHayvanTuruVerileri() {
  // Sunucudan hayvan türü sayıları verilerini çek
  fetch('/api/hayvan-turu-sayilari')
      .then(response => response.json())
      .then(data => {
          // Grafiği oluştur
          createHayvanTuruGrafik(data);
      })
      .catch(error => console.error('Veri çekme hatası:', error));
}

function createHayvanTuruGrafik(veriler) {
  var ctx = document.getElementById('hayvanTuruGrafikCanvas').getContext('2d');

  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: veriler.hayvanTurAdlari, // Hayvan türü adları
          datasets: [{
              label: 'Hayvan Türü Sayıları',
              data: veriler.hayvanTurSayilari, // Hayvan türü sayıları
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde sahip-hayvan sayıları verilerini al ve dairesel grafik oluştur
    getSahipHayvanSayilari();
});

function getSahipHayvanSayilari() {
    // Sunucudan sahip-hayvan sayıları verilerini çek
    fetch('/api/sahip-hayvan-sayilari')
        .then(response => response.json())
        .then(data => {
            // Dairesel grafiği oluştur
            createSahipHayvanGrafik(data);
        })
        .catch(error => console.error('Veri çekme hatası:', error));
}

function createSahipHayvanGrafik(veriler) {
    var ctx = document.getElementById('sahipHayvanGrafikCanvas').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: veriler.map(entry => entry.sahip_ad),
            datasets: [{
                data: veriler.map(entry => entry.hayvan_sayisi),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
            }],
        },
    });
}




function createVeterinerHaritasi() {  
    var map = L.map('veterinerHaritaDiv').setView([40.4346, 29.1554], 12); // Gemlik, Bursa'nın koordinatları
    

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


var markers = [
            { coordinates: [40.42541, 29.16194], name: "Petlife Veteriner Kliniği", icon: greyIcon},
            { coordinates: [40.43196, 29.15764], name: "Gönül Veteriner Kliniği", icon: blueIcon},
            { coordinates: [40.43360, 29.15311], name: "Körfez Veteriner Kliniği", icon: greenIcon},
            { coordinates: [40.418209, 29.135687], name: "Gönül Veteriner Kliniği2", icon: blueIcon},
            { coordinates: [40.432331, 29.154692], name: "Kendine Has Veteriner Kliniği", icon: redIcon},
            { coordinates: [40.444324, 29.139519], name: "Kendine Has Veteriner Kliniği2", icon: redIcon},
            { coordinates: [40.431820, 29.155416], name: "Kendine Has Veteriner Kliniği3", icon: redIcon},
          
];

markers.forEach(function (markerInfo) {
var marker = L.marker(markerInfo.coordinates, { icon: markerInfo.icon }).addTo(map);

    marker.bindPopup(
        "<p>" + (markerInfo.name) + "</p>"
    ).openPopup();
});

}
   
function createPetshopHaritasi() {   var petshopHarita = L.map('petshopHaritaDiv').setView([40.4346, 29.1554], 12); // Gemlik, Bursa'nın koordinatları

    

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(petshopHarita);



// Veteriner marker'larını ekleyin (örnek)
    const petshopMarkers = [
        {coordinates: [40.43294, 29.15376],name: 'Emre Petshop', icon: greenIcon },
        {coordinates: [40.42926, 29.15775],name: 'Petonya Petshop', icon: greyIcon },
        {coordinates: [40.42915, 29.15508],name: 'Baracuda Petshop', icon: blueIcon },
        {coordinates: [40.42656, 29.16137],name: 'Şirinler Petshop', icon: redIcon },
        {coordinates: [40.43289, 29.15560],name: 'Atlantis Akvaryum', icon: blueIcon },
        {coordinates: [40.42634, 29.15585],name: 'Purlina Petshop', icon: greenIcon },
        
        
        

        // Diğer veteriner marker'ları ...
    ];

    petshopMarkers.forEach(function (markerInfo) {
        var marker = L.marker(markerInfo.coordinates, { icon: markerInfo.icon }).addTo(petshopHarita);
        
            marker.bindPopup(
                "<p>" + (markerInfo.name) + "</p>"
            ).openPopup();
        });
        
}




function createOtoparkHaritasi() {   var otoparkHarita = L.map('otoparkHaritaDiv').setView([40.4346, 29.1554], 12); // Gemlik, Bursa'nın koordinatları

    

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(otoparkHarita);



// Veteriner marker'larını ekleyin (örnek)
    const otoparkMarkers = [
        {coordinates: [40.43052, 29.15440 ],name: 'Açık Otopark', icon: greenIcon },
        {coordinates: [40.43259, 29.15771 ],name: 'Gemlik Belediyesi Açık Otopark', icon: greyIcon },
        {coordinates: [40.43224, 29.15525 ],name: 'Erim Otopark', icon: redIcon },
        {coordinates: [40.42933, 29.15788 ],name: 'Belediye Otopark', icon: blueIcon },
     
     
        

        // Diğer veteriner marker'ları ...
    ];

    otoparkMarkers.forEach(function (markerInfo) {
        var marker = L.marker(markerInfo.coordinates, { icon: markerInfo.icon }).addTo(otoparkHarita);
        
            marker.bindPopup(
                "<p>" + (markerInfo.name) + "</p>"
            ).openPopup();
        });
    }

function createGemlikHaritasi() {    
     var gemlikHarita = L.map('gemlikHaritaDiv').setView([40.4346, 29.1554], 12); // Gemlik, Bursa'nın koordinatları

    

var redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(gemlikHarita);


// Veteriner marker'larını ekleyin (örnek)
    var gemlikMarkers = [
       { coordinates: [40.418209 , 29.135687 ], stationInfo: {
                    name: "Mahalle Adı: Ata Mahallesi",
                    detail1: "İnsan Sayısı: 1 ",
                    detail2: "Hayvan Sayısı:2",
                    detail3: "Kedi:2 Köpek:0 Kuş:0",
                    detail4: "Veteriner Sayısı:1",
                    detail5: "Petshop Sayısı: 1",
                    detail6: "Otopark Sayısı:0",
          }, icon: greenIcon },
          { coordinates: [40.388935, 29.206762 ], stationInfo: {
            name: "Mahalle Adı: Adliye Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },

        { coordinates: [40.434959, 29.152102], stationInfo: {
            name: "Mahalle Adı: Balıkpazarı Mahallesi",
            detail1: "İnsan Sayısı:1",
            detail2: "Hayvan Sayısı:1",
            detail3: "Kedi:0 Köpek:1 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon },

        { coordinates: [40.477890, 29.122076], stationInfo: {
            name: "Mahalle Adı: Büyükkumla Mahallesi",
            detail1: "İnsan Sayısı:1",
            detail2: "Hayvan Sayısı:3",
            detail3: "Kedi:1 Köpek:1 Kuş:1",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon },
        { coordinates: [40.444324, 29.139519 ], stationInfo: {
            name: "Mahalle Adı: Cumhuriyet Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: blueIcon },
        { coordinates: [40.431820, 29.155416], stationInfo: {
            name: "Mahalle Adı: Cihatlı Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.432331, 29.154692], stationInfo: {
            name: "Mahalle Adı: Demirsubaşı Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 1",
            detail6: "Otopark Sayısı:1",
        }, icon: blueIcon },
        { coordinates: [40.425854, 29.169868], stationInfo: {
            name: "Mahalle Adı: Dr.Ziya Kaya Mahallesi",
            detail1: "İnsan Sayısı:7",
            detail2: "Hayvan Sayısı:11",
            detail3: "Kedi:1 Köpek:7 Kuş:3",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 1",
            detail6: "Otopark Sayısı:0",
        }, icon: redIcon },
        { coordinates: [40.40578, 29.128550 ], stationInfo: {
            name: "Mahalle Adı: Engürücük Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [ 40.433102, 29.162495], stationInfo: {
            name: "Mahalle Adı: Eşref Dinçer Mahallesi",
            detail1: "İnsan Sayısı:3",
            detail2: "Hayvan Sayısı:5",
            detail3: "Kedi:1 Tavşan:1 Kuş:2 Kaplumbağa:1",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: redIcon },
        { coordinates: [40.355690, 29.280710], stationInfo: {
            name: "Mahalle Adı:Fevziye Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.339710, 29.339420], stationInfo: {
            name: "Mahalle Adı: Fındıcak Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.386841, 29.071905], stationInfo: {
            name: "Mahalle Adı: Gençali Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.384970, 29.234310], stationInfo: {
            name: "Mahalle Adı: Güvenli Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.436562, 29.152739], stationInfo: {
            name: "Mahalle Adı: Halitpaşa Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.430420,29.155827], stationInfo: {
            name: "Mahalle Adı: Hamidiye Mahallesi(merkez)",
            detail1: "İnsan Sayısı:3",
            detail2: "Hayvan Sayısı:3",
            detail3: "Kedi:1 Köpek:2 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 1",
            detail6: "Otopark Sayısı:2",
        }, icon: greenIcon },
        { coordinates: [40.518299, 29.125200], stationInfo: {
            name: "Mahalle Adı: Haydariye Mahallesi",
            detail1: "İnsan Sayısı:1",
            detail2: "Hayvan Sayısı:1",
            detail3: "Kedi:1 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon },
        { coordinates: [40.419231, 29.148270], stationInfo: {
            name: "Mahalle Adı: Hisar Mahallesi",
            detail1: "İnsan Sayısı:1",
            detail2: "Hayvan Sayısı:1",
            detail3: "Kedi:1 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon },
        { coordinates: [40.479240, 29.066760], stationInfo: {
            name: "Mahalle Adı: Karacali Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.364430, 29.216290], stationInfo: {
            name: "Mahalle Adı: Katırlı Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.435055, 29.155418], stationInfo: {
            name: "Mahalle Adı: Kayhan Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 1",
            detail6: "Otopark Sayısı:0",
        }, icon: blueIcon },
        { coordinates: [40.471370 , 29.099780], stationInfo: {
            name: "Mahalle Adı: Kumla Mahallesi",
            detail1: "İnsan Sayısı:2",
            detail2: "Hayvan Sayısı:4",
            detail3: "Kedi:1 Köpek:1 Kuş:1 Kaplumbağa:1",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 1",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon },
        { coordinates: [40.364101, 29.120899], stationInfo: {
            name: "Mahalle Adı: Kurtul Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.362274,  29.052204], stationInfo: {
            name: "Mahalle Adı: Kurşunlu Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.477850, 29.122350 ], stationInfo: {
            name: "Mahalle Adı: Küçükkumla Mahallesi",
            detail1: "İnsan Sayısı:1",
            detail2: "Hayvan Sayısı:1",
            detail3: "Kedi:0 Köpek:1 Kuş:0",
            detail4: "Veteriner Sayısı:1",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greenIcon},
        { coordinates: [40.363460, 29.180670], stationInfo: {
            name: "Mahalle Adı: Muratoba Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.480408, 29.034439], stationInfo: {
            name: "Mahalle Adı: Narlı Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.438210, 29.150595], stationInfo: {
            name: "Mahalle Adı: Orhaniye Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon},
        { coordinates: [40.435303, 29.162264], stationInfo: {
            name: "Mahalle Adı: Osmaniye Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [ 40.414070, 29.180510 ], stationInfo: {
            name: "Mahalle Adı: Umurbey Mahallesi",
            detail1: "İnsan Sayısı:4",
            detail2: "Hayvan Sayısı:9",
            detail3: "Kedi:4 Köpek:5 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: redIcon },
        { coordinates: [40.466125, 29.216415], stationInfo: {
            name: "Mahalle Adı: Şahinyurdu Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.335820, 29.272810], stationInfo: {
            name: "Mahalle Adı: Şükriye Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
        { coordinates: [40.438351, 29.157236], stationInfo: {
            name: "Mahalle Adı: Yeni Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon},
        { coordinates: [40.380581, 29.155931], stationInfo: {
            name: "Mahalle Adı: Yeniköy Mahallesi",
            detail1: "İnsan Sayısı:0",
            detail2: "Hayvan Sayısı:0",
            detail3: "Kedi:0 Köpek:0 Kuş:0",
            detail4: "Veteriner Sayısı:0",
            detail5: "Petshop Sayısı: 0",
            detail6: "Otopark Sayısı:0",
        }, icon: greyIcon },
       
];

    gemlikMarkers.forEach(function (markerInfo) {
    var marker = L.marker(markerInfo.coordinates, { icon: markerInfo.icon }).addTo(gemlikHarita);

        markerInfo.stationInfo.detail1 ?
    marker.bindPopup(
            "<b>" + (markerInfo.stationInfo?.name)+ "</b>" +
            "<p>" + (markerInfo.stationInfo?.detail1)+ "</p>" +
            "<p>" + (markerInfo.stationInfo?.detail2) + "</p>" +
            "<p>" + (markerInfo.stationInfo?.detail3) + "</p>"+
            "<p>" + (markerInfo.stationInfo?.detail4) + "</p>" +
            "<p>" + (markerInfo.stationInfo?.detail5) + "</p>"+
            "<p>" + (markerInfo.stationInfo?.detail6) + "</p>"
        ).openPopup() :
        marker.bindPopup(
            "<p>" + (markerInfo.stationInfo) + "</p>"
        ).openPopup();
    });
}

function createYerHaritasi() {    
    var yerHarita = L.map('yerHaritaDiv').setView([40.4346, 29.1554], 12); // Gemlik, Bursa'nın koordinatları

var redIcon = L.icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

var blueIcon = L.icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

var greenIcon = L.icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

var greyIcon = L.icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '© OpenStreetMap contributors'
}).addTo(yerHarita);


// Veteriner marker'larını ekleyin (örnek)
   var yerMarkers = [
    { coordinates: [40.425854, 29.169868], stationInfo: {
        name: "Mahalle Adı: Dr.Ziya Kaya Mahallesi",
        detail1: "Yeni Lokasyon Seçimi için Uygun Olabilir.",
        detail2: "Petshop:1 Veteriner:1."
     }, icon: redIcon },
    { coordinates: [ 40.433102, 29.162495], stationInfo: {
        name: "Mahalle Adı: Eşref Dinçer Mahallesi",
        detail1: "Yeni Lokasyon Seçimi için Uygun Olabilir.",
        detail2: "Petshop=0 Veteriner=0",
    }, icon: redIcon },
    { coordinates: [ 40.414070, 29.180510 ], stationInfo: {
        name: "Mahalle Adı: Umurbey Mahallesi",
        detail1: "Yeni Lokasyon Seçimi için Uygun Olabilir.",
        detail2: "Petshop=0 Veteriner=0",
    }, icon: redIcon },
    { coordinates: [40.432331, 29.154692], stationInfo: {
        name: "Mahalle Adı: Demirsubaşı Mahallesi",
        detail1: "Kendine Has Veteriner Kliniği",
        detail2: "Var olan Şube",
    }, icon: greyIcon },
    { coordinates: [40.444324, 29.139519 ], stationInfo: {
        name: "Mahalle Adı: Cumhuriyet Mahallesi",
        detail1: "Kendine Has Veteriner Kliniği 2.Şube",
        detail2: "var olan Şube",
    
    }, icon: greyIcon },
    { coordinates: [40.477850, 29.122350 ], stationInfo: {
        name: "Mahalle Adı: Küçükkumla Mahallesi",
        detail1: "Kendine Has Veteriner Kliniği 3.Şube",
        detail2: "Var olan Şube",
    }, icon: greyIcon},
   ];

 yerMarkers.forEach(function (markerInfo) {
        var marker = L.marker(markerInfo.coordinates, { icon: markerInfo.icon }).addTo(yerHarita);
    
            markerInfo.stationInfo.detail1 ?
        marker.bindPopup(
                "<b>" + (markerInfo.stationInfo?.name)+ "</b>" +
                "<p>" + (markerInfo.stationInfo?.detail1)+ "</p>"+
                "<p>" + (markerInfo.stationInfo?.detail2)+ "</p>" 
        ).openPopup() :
            marker.bindPopup(
                "<p>" + (markerInfo.stationInfo) + "</p>"
            ).openPopup();
        });
}

