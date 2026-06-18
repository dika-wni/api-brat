module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';

    // Membuat halaman HTML instan bergaya stiker Brat asli
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

    // Mengalihkan output ke API htmlcsstoimage gratis untuk diubah menjadi PNG asli secara realtime
    const renderUrl = `https://api.htmlcsstoimage.com/v1/image?html=${encodeURIComponent(htmlCode)}&width=512&height=512`;
    
    // Alihkan (Redirect) bot langsung ke gambar PNG asli hasil render
    res.redirect(302, renderUrl);
};
