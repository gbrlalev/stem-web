const date = document.getElementById("date");
const today = document.getElementById("today");
const check = document.getElementById("check");
const emoji = document.getElementById("emoji");
const phaseName = document.getElementById("phaseName");
const desc = document.getElementById("desc");

function localDateFormat(d) {
    const timezone = d.getTimezoneOffset() * 60000;
    const localISOTime = new Date(d - timezone).toISOString().slice(0, 10);
    return localISOTime;
}

today.addEventListener("click", () => {
    date.value = localDateFormat(new Date());
});

check.addEventListener("click", () => {
    tampilinFase(new Date(date.value));
});

function hitungUmurBulan(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + (date.getUTCHours() / 24);

    if (month < 3) {
        year--;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = A / 4;
    const C = 2 - A + B;
    const E = Math.floor(365.25 * (year + 4716));
    const F = Math.floor(30.6001 * (month + 1));
    const JD = C + day + E + F - 1524.5;

    const synodicMonth = 29.53;
    let frac = (JD - 2451550.1) / synodicMonth % 1;
    if (frac < 0) frac += 1;
    const age = frac * synodicMonth;
    return {age, frac};
}

function info(age) {
    if (age <= 1) {
        return {
            phase: "Fase Bulan Baru (New Moon)", 
            desc: "Bulan tidak menerima cahaya dari matahari sama sekali sehingga bulan berwarna gelap dan menjadi tidak terlihat di bumi.", 
            emoji: "🌑"
        };
    }
    if (age <= 4) {
        return {
            phase: "Fase Sabit Muda (Waxing Crescent)",
            desc: "Kurang dari setengah bagian dari bulan terkena pantulan sinar matahari sehingga bulan berbentuk seperti sabit atau arit.",
            emoji: "🌒"
        };
    }
    if (age <= 8) {
        return {
            phase: "Fase Kuartal Pertama (First Quarter)",
            desc: "Bulan berada pasa posisi 90 derajat sehingga bulan terlihat berbentuk setengah lingkaran.",
            emoji: "🌓"
        };
    }
    if (age <= 11) {
        return {
            phase: "Fase Cembung Awal (Waxing Gibbous)",
            desc: "Setengah bagian bulan tampak lebih besar dari fase Kuartal Pertama. Bulan terlihat seperti cakram yang biasa disebut dengan bulan cembung.",
            emoji: "🌔"
        };
    }
    if (age <= 14) {
        return {
            phase: "Fase Bulan Purnama (Full Moon)",
            desc: "Bulan berada pada sisi yang berlawanan dengan bumi yang menyebabkan cahaya matahri terpantul ke bulan sepenuhnya.",
            emoji: "🌕"
        };
    }
    if (age <= 17) {
        return {
            phase: "Fase Cembung Akhir (Waning Gibbous)",
            desc: "Bulan akan tampak sedikit mengecil dari fase Bulan Penuh. Jika dilihat dari bumi, penampakannya mulai berubah kembali seperti cakram atau bulan cembung dengan catatan bahwa tampak kanan yang gelap.",
            emoji: "🌖"
        };
    }
    if (age <= 21) {
        return {
            phase: "Fase Kuartal Ketiga (Third Quarter)",
            desc: "Bulan kembali terlihat setengah bagian sehingga tampak seperti bulan pada fase Kuartal Pertama, tetapi bagian kanan yang tampak gelap.",
            emoji: "🌗"
        };
    }
    if (age <= 25) {
        return {
            phase: "Fase Sabit Tua (Waning Crescent)",
            desc: "Hanya sebagian kecil dari bulan yang terlihat dari bumi. Bulan berbentuk seperti sabit atau arit dengan bagian kanan yang tampak gelap.",
            emoji: "🌘"
        };
    }
}

function tampilinFase(tanggal) {
    const {age} = hitungUmurBulan(tanggal);
    const {phase: faseBulan, desc: deskripsiBulan, emoji: emojiBulan} = info(age);

    phase.textContent = faseBulan;
    desc.textContent = deskripsiBulan;
    emoji.textContent = emojiBulan;
}

tampilinFase(new Date(date.value));

date.addEventListener('keydown', e => {
    if (e.key === 'Enter' && date.value) {
        tampilinFase(new Date(date.value));
    }
});