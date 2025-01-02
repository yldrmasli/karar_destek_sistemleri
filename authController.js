const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getRegisterPage = (req, res) => {
    res.render("register", { error: null });
};

exports.register = async (req, res) => {
    const { bayi_id, role_id, ad, soyad, email, sifre } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(sifre, 10);
        await User.create({
            bayi_id,
            role_id,
            ad,
            soyad,
            email,
            sifre: hashedPassword,
        });

        res.redirect("/auth/login");
    } catch (error) {
        console.error("Kayıt sırasında hata:", error);
        res.render("register", { error: "Kayıt başarısız! E-posta zaten kullanılıyor olabilir." });
    }
};

exports.login = async (req, res) => {
    const { email, sifre } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.redirect("/auth/login?error=Hatalı e-posta veya şifre");
        }

        const isPasswordValid = await bcrypt.compare(sifre, user.sifre);
        if (!isPasswordValid) {
            return res.redirect("/auth/login?error=Hatalı e-posta veya şifre");
        }

        req.session.user = {
            id: user.user_id,
            email: user.email,
            role: user.role_id,
        };

        res.redirect("/");
    } catch (error) {
        console.error("Giriş sırasında hata:", error);
        res.redirect("/auth/login?error=Bir hata oluştu");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
};
