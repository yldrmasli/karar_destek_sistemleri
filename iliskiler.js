const User = require('../models/User');
const Role = require('../models/Role');
const Bayiler = require('../models/Bayiler');
const BayiGecmis = require('../models/BayiGecmis');
const Calisanlar = require('../models/Calisanlar');
const Pozisyonlar = require('../models/Pozisyonlar');
const Ilceler = require('../models/Ilceler');
const SaglikBirimleri = require('../models/SaglikBirimleri');
const IlceGelismislik = require('../models/IlceGelismislik');
// 1. User - Role (Many-to-One)
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// 2. User - Bayiler (Many-to-One)
Bayiler.hasMany(User, { foreignKey: 'bayi_id' });
User.belongsTo(Bayiler, { foreignKey: 'bayi_id' });

// 3. Bayiler - Ilceler (Many-to-One)
Ilceler.hasMany(Bayiler, { foreignKey: 'ilce_id' });
Bayiler.belongsTo(Ilceler, { foreignKey: 'ilce_id' });

// İlişkiyi tanımla
BayiGecmis.belongsTo(Bayiler, { foreignKey: 'bayi_id', targetKey: 'bayi_id' });
Bayiler.hasMany(BayiGecmis, { foreignKey: 'bayi_id' });

// 5. Bayiler - Calisanlar (One-to-Many)
Bayiler.hasMany(Calisanlar, { foreignKey: 'bayi_id' });
Calisanlar.belongsTo(Bayiler, { foreignKey: 'bayi_id' });

// 6. Calisanlar - Pozisyonlar (Many-to-One)
Pozisyonlar.hasMany(Calisanlar, { foreignKey: 'pozisyon_id' });
Calisanlar.belongsTo(Pozisyonlar, { foreignKey: 'pozisyon_id' });

// 7. Ilceler - SaglikBirimleri (One-to-One)
Ilceler.hasOne(SaglikBirimleri, { foreignKey: 'ilce_id' });
SaglikBirimleri.belongsTo(Ilceler, { foreignKey: 'ilce_id' });


module.exports = {
    User,
    Role,
    Bayiler,
    BayiGecmis,
    Calisanlar,
    Pozisyonlar,
    Ilceler,
    SaglikBirimleri,
    IlceGelismislik
};
