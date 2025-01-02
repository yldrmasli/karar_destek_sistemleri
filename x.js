const sequelize = require('./config/db');  // Sequelize veritabanı bağlantısı
const BayiGecmis = require('./models/BayiGecmis'); // Modelleri import et
const Bayiler = require('./models/Bayiler');
const Ilceler = require('./models/Ilceler');
const SaglikBirimleri = require('./models/SaglikBirimleri');
const Calisanlar = require('./models/Calisanlar');
const Pozisyonlar = require('./models/Pozisyonlar');
const Role = require('./models/Role');
const User = require('./models/User');
const IlceGelismislik = require('./models/IlceGelismislik');

// Tüm modellerinizi dizide toplayın
const models = [BayiGecmis, Bayiler, Ilceler, SaglikBirimleri, Calisanlar, Pozisyonlar, Role, User, IlceGelismislik];

// Veritabanını güncelle, ancak tabloyu silme veya oluşturma işlemi yapma
sequelize.sync({ force: false, alter: true })
    .then(() => {
        console.log('Veritabanı başarıyla senkronize edildi, tabloyu silme ve oluşturma yapılmadı.');
    })
    .catch((error) => {
        console.error('Senkronizasyon sırasında hata oluştu:', error);
    });
