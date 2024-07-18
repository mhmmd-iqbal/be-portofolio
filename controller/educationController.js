const { db } = require('../firebaseConfig');
const moment = require('moment');

const index = async (req, res) => {
    try {
        const results = [];
        const snapshot = await db.collection('education').orderBy('created_at', 'desc').get();
        snapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
        });
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting documents: ' + error.message);
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('education').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }
        res.send({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting document: ' + error.message);
    }
};

const create = async (req, res) => {
    try {
        // Create the new work education document
        const newEducation = {
            name: req.body.name,
            title: req.body.title,
            location: req.body.location,
            start_from: req.body.start_from,
            end_to: req.body.end_to || null,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
            deleted_at: null,
        };

        const docRef = await db.collection('education').add(newEducation);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding document: ' + error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the existing document
        const doc = await db.collection('education').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        // Update document data
        const updatedData = {
            name: req.body.name || doc.data().name,
            title: req.body.title || doc.data().title,
            location: req.body.location || doc.data().location,
            start_from: req.body.start_from || doc.data().start_from,
            end_to: req.body.end_to || doc.data().end_to,
            updated_at: moment().toDate(),
        };

        await db.collection('education').doc(id).update(updatedData);
        res.status(200).send('Document successfully updated');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating document: ' + error.message);
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the existing document
        const doc = await db.collection('education').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        // Delete the document
        await db.collection('education').doc(id).delete();

        res.status(200).send('Document successfully deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting document: ' + error.message);
    }
};

module.exports = { index, create, show, update, destroy };
