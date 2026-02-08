module.exports = (req, res, next) => {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
        return res.status(400).json({ mensaje: 'Título y descripción obligatorios' });
    }

    next();
};
