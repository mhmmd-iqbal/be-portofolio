const { db, storage } = require('../firebaseConfig');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames

const index = async (req, res) => {
    try {
        const results = [];
        const snapshot = await db.collection('workExperience').orderBy('created_at', 'desc').get();
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
        const doc = await db.collection('workExperience').doc(id).get();
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
        // Check if file is provided
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const bucket = storage.bucket();
        const uuid = uuidv4(); // Generate a new UUID
        const fileExtension = req.file.originalname.split('.').pop(); // Extract the original file extension
        const fileName = `workExperience/${uuid}.${fileExtension}`; // Combine UUID and extension for the file name
        const file = bucket.file(fileName);

        // Upload the file to Firebase Storage
        await file.save(req.file.buffer, {
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        // Make the file public
        await file.makePublic();

        // Get the public URL
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

        // Create the new work experience document
        const newWorkExperience = {
            name: req.body.name,
            description: req.body.description || null,
            position: req.body.position,
            start_from: req.body.start_from,
            end_to: req.body.end_to || null,
            image_url: imageUrl,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
            deleted_at: null,
        };

        const docRef = await db.collection('workExperience').add(newWorkExperience);
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
        const doc = await db.collection('workExperience').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        // Update document data
        const updatedData = {
            name: req.body.name || doc.data().name,
            description: req.body.description || doc.data().description,
            position: req.body.position || doc.data().position,
            start_from: req.body.start_from || doc.data().start_from,
            end_to: req.body.end_to || doc.data().end_to,
            updated_at: moment().toDate(),
        };

        // Check if a new file is provided
        if (req.file) {
            const bucket = storage.bucket();
            const uuid = uuidv4(); // Generate a new UUID
            const fileExtension = req.file.originalname.split('.').pop(); // Extract the original file extension
            const fileName = `workExperience/${uuid}.${fileExtension}`; // Combine UUID and extension for the file name
            const file = bucket.file(fileName);

            // Upload the file to Firebase Storage
            await file.save(req.file.buffer, {
                metadata: {
                    contentType: req.file.mimetype,
                },
            });

            // Make the file public
            await file.makePublic();

            // Get the public URL
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            updatedData.image_url = imageUrl; // Update the image URL
        }

        await db.collection('workExperience').doc(id).update(updatedData);
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
        const doc = await db.collection('workExperience').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        // Delete the document
        await db.collection('workExperience').doc(id).delete();

        // Optionally delete the file from storage (if you stored the file name/path in the document)
        const fileName = doc.data().image_url.split('/').pop();
        const file = storage.bucket().file(`workExperience/${fileName}`);
        await file.delete();

        res.status(200).send('Document successfully deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting document: ' + error.message);
    }
};

module.exports = { index, create, show, update, destroy };
