const axios = require('axios');

module.exports = async (req, res) => {
    // Jalur cepat untuk browser (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Harus POST ya bos' });
    }

    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'Foto kosong' });
    }

    try {
        // Kirim ke Fonnte
        const response = await axios.post('https://api.fonnte.com/send', {
            target: '6285117090357',
            url: image,
            caption: '🚨 *TARGET TERDETEKSI!*',
        }, {
            headers: { 
                'Authorization': 'PG3GRjmArXV4PHYgQaFz',
                'Content-Type': 'application/json'
            },
            timeout: 10000 // Beri waktu 10 detik
        });

        return res.status(200).json({ success: true, data: response.data });

    } catch (error) {
        console.error('Error detail:', error.response ? error.response.data : error.message);
        return res.status(500).json({ 
            success: false, 
            error: 'Gagal kirim ke Fonnte',
            detail: error.message 
        });
    }
};