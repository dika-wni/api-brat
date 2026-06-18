module.exports = async (req, res) => {
    const text = req.query.text || 'Brat';
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(text.toLowerCase());
};
