

const notFound = (req, res, next) => {
    res.status(404).send({
        error: true,
        message: "Aradığınız adres bulunamadı!"
    });
};

module.exports = notFound