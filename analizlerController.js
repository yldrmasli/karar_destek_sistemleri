
const { get } = require('http');
const Ilceler = require('../models/Ilceler'); // İlçeler tablosu modeli
const SaglikBirimleri = require('../models/SaglikBirimleri'); // Sağlık birimleri tablosu modeli

const getAnalizlerPage = (req, res) => {
    res.render('analizler', {
        title: 'Analizler',
        user: 'aslı yıldırım' // Örnek kullanıcı bilgisi
    });
};




const normalizeWeights = (weights) => {
    const totalWeight = Object.values(weights).reduce((acc, weight) => acc + parseFloat(weight || 0), 0);
    if (totalWeight === 0) return weights; 
    return Object.fromEntries(
        Object.entries(weights).map(([key, value]) => [key, parseFloat(value || 0) / totalWeight])
    );
};

const normalizeField = (fieldValues) => {
    const min = Math.min(...fieldValues);
    const max = Math.max(...fieldValues);
    if (min === max) return fieldValues.map(() => 1); 
    return fieldValues.map(value => (value - min) / (max - min));
};

const analyzeData = async (req, res) => {
    try {
        const rawWeights = req.body;
        const weights = normalizeWeights(rawWeights);

        const ilceler = await Ilceler.findAll({
            include: [
                {
                    model: SaglikBirimleri,
                    attributes: ['huzurevi_sayisi', 'hastane_sayisi'],
                },
            ],
        });

        const yasliNufusValues = ilceler.map(ilce => ilce.yasli_nufus || 0);
        const yasliOraniValues = ilceler.map(ilce => ilce.yasli_orani || 0);
        const gelismislikSkorValues = ilceler.map(ilce => ilce.gelismislik_skor || 0);
        const huzureviValues = ilceler.map(ilce => ilce.SaglikBirimleri?.huzurevi_sayisi || 0);
        const hastaneValues = ilceler.map(ilce => ilce.SaglikBirimleri?.hastane_sayisi || 0);

        const normalizedYasliNufus = normalizeField(yasliNufusValues);
        const normalizedYasliOrani = normalizeField(yasliOraniValues);
        const normalizedGelismislikSkor = normalizeField(gelismislikSkorValues);
        const normalizedHuzurevi = normalizeField(huzureviValues);
        const normalizedHastane = normalizeField(hastaneValues);

        const results = ilceler.map((ilce, index) => {
            const ahpSkor =
                ((normalizedGelismislikSkor[index] * weights.gelismislik_skor) +
                (normalizedYasliNufus[index] * weights.yasli_nufus) +
                (normalizedYasliOrani[index] * weights.yasli_orani) +
                (normalizedHuzurevi[index] * weights.huzurevi_sayisi) +
                (normalizedHastane[index] * weights.hastane_sayisi)) * 100;

            return {
                ...ilce.dataValues,
                ahp_skor: ahpSkor.toFixed(2),
                yasli_nufus: ilce.yasli_nufus,
                yasli_orani: ilce.yasli_orani,
                gelismislik_skor: ilce.gelismislik_skor,
                huzurevi_sayisi: ilce.SaglikBirimleri?.huzurevi_sayisi || 0,
                hastane_sayisi: ilce.SaglikBirimleri?.hastane_sayisi || 0,
            };
        });

        results.sort((a, b) => b.ahp_skor - a.ahp_skor);

        res.json({ genelIstatistikler: { toplamIlce: results.length }, ilceler: results });
    } catch (error) {
        console.error("Hata:", error.message);
        res.status(500).json({ error: error.message || 'Bir hata oluştu.' });
    }
};

const getChartData = async (req, res) => {
    try {
        const ilceler = await Ilceler.findAll({
            include: [
                {
                    model: SaglikBirimleri,
                    attributes: ['huzurevi_sayisi', 'hastane_sayisi'],
                },
            ],
        });

        const ahpSkorlar = ilceler.map(ilce => ilce.dataValues.ahp_skor || 0);
        const ilceAdlari = ilceler.map(ilce => ilce.dataValues.ilce_adi || "Bilinmiyor");

        console.log("AHP Skorlar:", ahpSkorlar);
        console.log("İlçe Adları:", ilceAdlari);

        res.json({
            success: true,
            data: {
                labels: ilceAdlari,
                scores: ahpSkorlar,
            },
        });
    } catch (error) {
        console.error("Hata:", error.message);
        res.status(500).json({ success: false, message: error.message || 'Bir hata oluştu.' });
    }
};


module.exports = {
    getAnalizlerPage,analyzeData , getChartData
};