const BayiGecmis = require('../models/BayiGecmis');
const Ilceler = require('../models/Ilceler'); // İlçeler tablosu modeli
const SaglikBirimleri = require('../models/SaglikBirimleri');


const getIndexPage = (req, res) => {
    res.render('index');
};

const getDashboardData = async (req, res) => {
    try {
        const data = await BayiGecmis.findAll();

        // Toplam müşteri sayısını hesapla
        const toplamMusteriSayisi = data.reduce((sum, record) => sum + record.ay_musteri_sayi, 0);

        // Toplam kazancı hesapla
        const toplamKazanc = data.reduce((sum, record) => sum + record.ay_kazanc, 0);

        // Benzersiz bayi sayısını hesapla
        const toplamBayiler = new Set(data.map(record => record.bayi_id)).size;

        const formatter = new Intl.NumberFormat('tr-TR');
        res.json({
            toplamMusteriSayisi: formatter.format(toplamMusteriSayisi),
            toplamKazanc: formatter.format(toplamKazanc),
            toplamBayiler: formatter.format(toplamBayiler)
        });
    } catch (error) {
        console.error('Dashboard verileri alınırken hata:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};
const getIlceData = async (req, res) => {
    try {
        const ilceAdi = req.params.ilce; // URL'den gelen ilçe adı

        // İlçe bilgilerini alın
        const ilce = await Ilceler.findOne({
            where: { ilce_isim: ilceAdi },
            attributes: ['ilce_id', 'nufus', 'yasli_nufus', 'yasli_orani', 'gelismislik_kademe', 'gelismislik_skor']
        });

        // İlçe bulunamadıysa hata döndür
        if (!ilce) {
            return res.status(404).json({ error: 'İlçe bulunamadı' });
        }

        // Sağlık birimlerini alın
        const saglikBirimleri = await SaglikBirimleri.findOne({
            where: { ilce_id: ilce.ilce_id },
            attributes: ['huzurevi_sayisi', 'hastane_sayisi']
        });

        // Sağlık birimleri bulunamadıysa hata döndür
        if (!saglikBirimleri) {
            return res.status(404).json({ error: 'Sağlık birimleri bilgisi bulunamadı' });
        }

        // Verileri birleştir
        const responseData = {
            nufus: ilce.nufus,
            yasli_nufus: ilce.yasli_nufus,
            yasli_orani: ilce.yasli_orani,
            gelismislik_kademe: ilce.gelismislik_kademe,
            gelismislik_skor: ilce.gelismislik_skor,
            huzurevi_sayisi: saglikBirimleri.huzurevi_sayisi,
            hastane_sayisi: saglikBirimleri.hastane_sayisi,
        };

        res.json(responseData);
    } catch (error) {
        console.error('Veri alınırken hata:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

module.exports = {
    getIndexPage,
    getDashboardData,
    getIlceData
};
