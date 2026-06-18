module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';

    const htmlCode = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 512px;
            height: 512px;
            background-color: white;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            box-sizing: border-box;
          }
          h1 {
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            font-style: italic;
            font-size: 90px;
            color: black;
            margin: 40px 0 0 40px;
            letter-spacing: -2px;
          }
        </style>
      </head>
      <body>
        <h1>${text.toLowerCase()}</h1>
      </body>
    </html>`;

    const renderUrl = `https://api.htmlcsstoimage.com/v1/image?html=${encodeURIComponent(htmlCode)}&width=512&height=512`;
    
    try {
        // Mengambil data gambar langsung dari generator grafis
        const response = await fetch(renderUrl);
        if (!response.ok) throw new Error('Gagal memuat gambar');
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Mengirimkan data biner PNG murni dengan status 200 OK ke WhatsApp
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(buffer);
    } catch (err) {
        res.status(500).send('Error internal server saat memproses gambar');
    }
};
