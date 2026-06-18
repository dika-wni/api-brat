const express = require('express');
const sharp = require('sharp');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/brat', async (req, res) => {
    const text = req.query.text || 'Brat';
    try {
        const svg = `
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <text x="30" y="80" font-family="Arial, sans-serif" font-size="75" font-weight="bold" font-style="italic" fill="black">
                ${text.toLowerCase()}
            </text>
        </svg>`;

        const webpBuffer = await sharp(Buffer.from(svg))
            .webp({ quality: 100 })
            .toBuffer();

        res.setHeader('Content-Type', 'image/webp');
        res.send(webpBuffer);
    } catch (err) {
        res.status(500).send('Error generating sticker');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      
