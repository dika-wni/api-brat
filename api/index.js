module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';
    
    // SVG Mandiri dengan injeksi Google Fonts resmi (Arial Bold / Impact lookalike)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <defs>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@1,900&amp;display=swap');
                .brat-text {
                    font-family: 'Inter', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    font-size: 96px;
                    fill: #000000;
                    letter-spacing: -3px;
                }
            </style>
        </defs>
        <rect width="512" height="512" fill="#FFFFFF"/>
        <text x="40" y="130" class="brat-text">${text.toLowerCase()}</text>
    </svg>`;

    // Kirim sebagai gambar SVG murni standar web yang diakui Baileys
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(svg);
};
