exports.calculateAge = (req, res) => {
    const { birthYear } = req.body;

    if (!birthYear || typeof birthYear !== 'number') {
        return res.status(400).json({
            error: "Invalid birth year provided."
        });
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    res.json({
        data: {
            age: age
        }
    });
};