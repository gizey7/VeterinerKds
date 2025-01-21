const mysql = require('mysql');

// MySQL bağlantı bilgileri
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'veterinerkds',
});

// MySQL bağlantısını açma
connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız: ' + err.stack);
    return;
  }
  console.log('MySQL bağlantısı başarıyla gerçekleştirildi. ID: ' + connection.threadId);
});

module.exports = connection;