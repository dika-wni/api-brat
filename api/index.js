module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';
    
    // Membuat gambar format SVG secara instan tanpa modul berat
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <rect width="512" height="512" fill="#FFFFFF"/>
        <text x="30" y="100" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-style="italic" font-size="85" fill="#000000">${text.toLowerCase()}</text>
    </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
};
