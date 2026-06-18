module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';
    
    // Generator Canvas SVG Inline untuk memisahkan ketergantungan eksternal
    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
        <rect width="100%" height="100%" fill="white"/>
        <text x="45" y="125" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-style="italic" font-size="95" fill="black" letter-spacing="-4">${text.toLowerCase()}</text>
    </svg>`;

    try {
        // Mengonversi SVG menjadi Buffer biner yang valid untuk pipeline Baileys
        const base64Svg = Buffer.from(svgText).toString('base64');
        const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
        
        const response = await fetch(`https://api.miniwalnam.io/render?url=${encodeURIComponent(dataUrl)}&type=png`);
        if (!response.ok) throw new Error();

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
        res.status(200).send(buffer);
    } catch (e) {
        // Fallback: Menyediakan representasi visual langsung jika API render mengalami timeout
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).send(svgText);
    }
};
