const { createCanvas } = require('canvas');

module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';
    
    try {
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        // Background Putih
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 512, 512);

        // Pengaturan Gaya Teks Brat (Arial, Tebal, Miring)
        ctx.fillStyle = '#000000';
        ctx.font = 'italic bold 75px Arial';
        ctx.textBaseline = 'top';

        // Menggambar teks ke canvas
        ctx.fillText(text.toLowerCase(), 30, 50);

        // Render menjadi buffer gambar PNG
        const buffer = canvas.toBuffer('image/png');

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(buffer);
    } catch (err) {
        res.status(500).send('Error generating image');
    }
};
