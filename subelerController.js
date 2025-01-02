const BayiGecmis = require('../models/BayiGecmis');
const Bayiler = require('../models/Bayiler');



const { Op } = require('sequelize');
const moment = require('moment');

// Sayfayı render eden kontrolör
const renderSubelerPage = (req, res) => {
    try {
        res.render('subeler', {
            pageTitle: 'Şubeler - As Yaşam',
        });
    } catch (error) {
        console.error('Sayfa render edilirken hata:', error);
        res.status(500).send('Sayfa yüklenemedi.');
    }
};

// Verileri dinamik olarak getiren kontrolör

const getSubelerData = async (req, res) => {
    try {
        const { bayi_id, ay } = req.body;

        

        if (!bayi_id || !ay) {
            return res.status(400).json({ error: 'Bayi ID ve ay bilgisi gerekli.' });
        }

        // BayiGecmis tablosundan veri çekme
        const veriler = await BayiGecmis.findAll({
            where: {
                bayi_id,
                ay
            },
            attributes: ['kayit_id', 'bayi_id', 'ay', 'ay_musteri_sayi', 'ay_kazanc'], // Gerekli alanlar
        });

        

        if (!veriler || veriler.length === 0) {
            return res.status(404).json({ error: 'Bu kriterlere uygun veri bulunamadı.' });
        }

        return res.status(200).json(veriler);
    } catch (err) {
        console.error('Veriler alınırken hata oluştu:', err);
        return res.status(500).json({ error: 'Veriler alınırken bir hata oluştu.' });
    }
};



module.exports = {
    renderSubelerPage,
    getSubelerData
};
