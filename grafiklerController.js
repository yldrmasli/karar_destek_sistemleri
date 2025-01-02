const Ilce = require("../models/Ilceler");
const SaglikBirimleri = require("../models/SaglikBirimleri"); // Yeni model
// Grafik verilerini döndüren fonksiyon
exports.getNufusData = async (req, res) => {
    try {
        const ilceler = await Ilce.findAll({
            attributes: ["ilce_isim", "nufus", "yasli_nufus"],
        });

        const data = ilceler.map((ilce) => ({
            ilce_isim: ilce.ilce_isim,
            nufus: ilce.nufus,
            yasli_nufus: ilce.yasli_nufus,
        }));

       

        res.json(data); // JSON formatında döndür
    } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
        res.status(500).json({ error: "Veri çekilemedi" });
    }
};

// Grafik sayfasını render eden fonksiyon
exports.getGrafikPage = (req, res) => {
    try {
        res.render("grafikler"); // grafik.ejs dosyasını render et
    } catch (error) {
        console.error("Sayfa render edilirken hata oluştu:", error);
        res.status(500).send("Sayfa yüklenemedi.");
    }
};

exports.getGelisScoreData = async (req, res) => {
    try {
        const ilceler = await Ilce.findAll({
            attributes: ["ilce_isim", "gelismislik_skor"], // 'gelismislik_skoru' veritabanında bulunmalı
        });

        const data = ilceler.map((ilce) => ({
            ilce_isim: ilce.ilce_isim,
            gelismislik_skor: ilce.gelismislik_skor,
        }));

         // Konsola yazdır
        res.json(data);
    } catch (error) {
        console.error("Gelişmişlik skoru verisi alınırken hata oluştu:", error);
        res.status(500).json({ error: "Veri alınamadı" });
    }
};


exports.getSaglikData = async (req, res) => {
    try {
        const birimler = await SaglikBirimleri.findAll({
            include: [
                {
                    model: Ilce,
                    attributes: ["ilce_isim"], // Sadece ilce_isim kolonunu al
                },
            ],
            attributes: ["huzurevi_sayisi", "hastane_sayisi"], // Sadece ihtiyaç olan kolonlar
        });

        const data = birimler.map((birim) => ({
            ilce_isim: birim.Ilce.ilce_isim, // Ilce modelinden alınan ilce_isim
            huzurevi_sayisi: birim.huzurevi_sayisi,
            hastane_sayisi: birim.hastane_sayisi,
        }));

        
        res.json(data);
    } catch (error) {
        console.error("Huzurevi ve hastane verisi alınırken hata oluştu:", error);
        res.status(500).json({ error: "Veri alınamadı" });
    }
};

exports.getYasliOraniData = async (req, res) => {
    try {
        const ilceler = await Ilce.findAll({
            attributes: ["ilce_isim", "nufus", "yasli_nufus"], // Gerekli alanlar
        });

        const data = ilceler.map((ilce) => {
            const yasli_orani =
                ilce.nufus > 0
                    ? ((ilce.yasli_nufus / ilce.nufus) * 100).toFixed(2) // Yaşlı oranını yüzdelik olarak hesapla
                    : 0; // Eğer nüfus 0 ise oranı 0 yap
            return {
                ilce_isim: ilce.ilce_isim,
                yasli_orani: parseFloat(yasli_orani), // Float olarak döndür
            };
        });

        
        res.json(data); // JSON formatında döndür
    } catch (error) {
        console.error("Yaşlı oranı verisi alınırken hata oluştu:", error);
        res.status(500).json({ error: "Veri alınamadı" });
    }
};