// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL bağlantısı
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'veterinerkds',
});

connection.connect((error) => {
  if (error) {
    console.error('MySQL bağlantısında bir hata oluştu:', error);
    throw error;
  }
  console.log('MySQL bağlantısı başarıyla sağlandı.');
});


// API endpoint'i
app.get('/api/sahip-bilgileri', (req, res) => {
  const query = 'SELECT * FROM sahip';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Sahip bilgileri çekerken bir hata oluştu:', error);
      return res.status(500).json({ error: 'Sahip bilgileri çekerken bir hata oluştu.' });
    }
    res.json(results);
  });
});
// API endpoint'i
app.get('/api/hayvan-bilgileri', (req, res) => {
  const query = 'SELECT * FROM hayvan'; // Tablo adını ve sütun adlarını güncelleyin
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Hayvan bilgileri çekerken bir hata oluştu:', error);
      return res.status(500).json({ error: 'Hayvan bilgileri çekerken bir hata oluştu.' });
    }
    res.json(results);
  });
});

// API endpoint'i
app.get('/api/mahalle-sayilari', (req, res) => {
  const query = 'SELECT mahalle_ad FROM sahip'; // Mahalle adlarını çekmek için bir sorgu
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Mahalle bilgileri çekerken bir hata oluştu:', error);
      return res.status(500).json({ error: 'Mahalle bilgileri çekerken bir hata oluştu.' });
    }

    // Sadece mahalle adlarını al ve istemciye gönder
    const mahalleAdlari = results.map(sahip => sahip.mahalle_ad);
    res.json({ mahalleAdlari });
  });
});

app.get('/api/hayvan-turu-sayilari', (req, res) => {
  // Veritabanından hayvan türü sayıları verilerini çek ve istemciye gönder
  const hayvanTurAdlari = ['Kedi', 'Köpek', 'Kuş', 'Kaplumbağa','Tavşan']; // Örnek veri
  const hayvanTurSayilari = [13, 18, 7, 2, 1]; // Örnek veri

  res.json({
      hayvanTurAdlari,
      hayvanTurSayilari
  });
});





// API endpoint'i
app.get('/api/sahip-hayvan-sayilari', (req, res) => {
  const query = 'SELECT sahip.sahip_ad, COUNT(hayvan.sahip_id) AS hayvan_sayisi FROM sahip LEFT JOIN hayvan ON sahip.sahip_id = hayvan.sahip_id GROUP BY sahip.sahip_id';
  
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Sahip-hayvan sayıları çekerken bir hata oluştu:', error);
          return res.status(500).json({ error: 'Sahip-hayvan sayıları çekerken bir hata oluştu.' });
      }

      res.json(results);
  });
});

app.get('/api/veteriner-klinikleri', (req, res) => {
  const query = 'SELECT * FROM veterinerler';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Veteriner klinikleri çekerken bir hata oluştu:', error);
          return res.status(500).json({ error: 'Veteriner klinikleri çekerken bir hata oluştu.' });
      }

    // Veteriner kliniklerinin koordinatlarını, isimlerini ve diğer bilgilerini içeren objeleri oluşturun
    const markers = results.map(veteriner => ({
      coordinates: [veteriner.lat, veteriner.lon], // Veteriner kliniğinin koordinatları
      name: veteriner.veteriner_ad, // Veteriner kliniğinin adı
      // Diğer bilgileri buraya ekleyin (örneğin: telefon numarası, adres, açıklama gibi...)
    }));

    res.json(markers);
  });
});

app.get('/api/petshop', (req, res) => {
  const query = 'SELECT * FROM petshoplar';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Petshop çekerken bir hata oluştu:', error);
          return res.status(500).json({ error: 'Petshop çekerken bir hata oluştu.' });
      }

    // Veteriner kliniklerinin koordinatlarını, isimlerini ve diğer bilgilerini içeren objeleri oluşturun
    const markers = results.map(petshop => ({
      coordinates: [petshop.lat, petshop.lon], // Veteriner kliniğinin koordinatları
      name: petshop.petshop_ad, // Veteriner kliniğinin adı
      // Diğer bilgileri buraya ekleyin (örneğin: telefon numarası, adres, açıklama gibi...)
    }));

    res.json(markers);
  });
});


app.get('/api/otopark', (req, res) => {
  const query = 'SELECT * FROM otoparklar';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Otopark çekerken bir hata oluştu:', error);
          return res.status(500).json({ error: 'Otopark çekerken bir hata oluştu.' });
      }

    // Veteriner kliniklerinin koordinatlarını, isimlerini ve diğer bilgilerini içeren objeleri oluşturun
    const markers = results.map(otopark => ({
      coordinates: [otopark.lat, otopark.lon], // Veteriner kliniğinin koordinatları
      name: otopark.otopark_ad, // Veteriner kliniğinin adı
      // Diğer bilgileri buraya ekleyin (örneğin: telefon numarası, adres, açıklama gibi...)
    }));

    res.json(markers);
  });
});


// Sayfa sunumu
app.use(express.static('styles')); // 'public' klasörü içindeki dosyaları sunar

app.use('/chart.js', express.static('node_modules/chart.js/dist/chart.min.js'));


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
  });

  



