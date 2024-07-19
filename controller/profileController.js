const { db } = require('../firebaseConfig');
const moment = require('moment');

const index = async (req, res) => {
    try {
        const snapshot = await db.collection('profile').limit(1).get();
        if (snapshot.empty) {
            return res.status(404).send('No document found');
        }
        let docData;
        snapshot.forEach(doc => {
            docData = { id: doc.id, ...doc.data() };
        });
        res.send(docData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting document: ' + error.message);
    }
};

const update = async (req, res) => {
    try {
        const profileData = {
            name: req.body.name,
            skills: req.body.skills,
            tag: req.body.tag,
            date_of_birth: req.body.date_of_birth,
            place_of_birth: req.body.place_of_birth,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            linkedin: req.body.linkedin,
            web: req.body.web,
            about: req.body.about,
            references: req.body.references,
            photo: req.body.photo || null,
            updated_at: moment().toDate(),
        };

        // Check if the document exists
        const snapshot = await db.collection('profile').limit(1).get();
        if (snapshot.empty) {
            // Create new document
            profileData.created_at = moment().toDate();
            const docRef = await db.collection('profile').add(profileData);
            return res.status(201).json({ id: docRef.id });
        } else {
            // Update existing document
            let docId;
            snapshot.forEach(doc => {
                docId = doc.id;
            });
            await db.collection('profile').doc(docId).update(profileData);
            return res.status(200).send('Document successfully updated');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating document: ' + error.message);
    }
};

module.exports = { index, update };
