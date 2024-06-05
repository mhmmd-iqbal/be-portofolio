const { db } = require('../firebaseConfig');
const moment = require('moment');

const index = async (req, res) => {
    try {
        const results = [];
        const snapshot = await db.collection('portofolio').orderBy('created_at', 'desc').get();
        snapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
        });
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting documents: ' + error.message);
    }
};

const create = async (req, res) => {
    try {
        const newPortfolio = {
            name: req.body.name,
            description: req.body.description || null,
            image_link: req.body.image_link || null,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
            deleted_at: null,
            stacks: req.body.stacks || [],
        };
        const docRef = await db.collection('portofolio').add(newPortfolio);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding document: ' + error.message);
    }
};

const update = async (req, res) => {
};

const destroy = async (req, res) => {
};

module.exports = { index, create, update, destroy };
