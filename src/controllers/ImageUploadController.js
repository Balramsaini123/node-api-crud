const User = require('../models/user'); // Assuming the model is named 'User'

async function imageUpload(req, res) {
    try {
        const userId = req.user._id; // Assuming the user ID is attached to the request (e.g., through authentication middleware)
        const imagePath = req.file.path;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Update the user_image field
        user.user_image = imagePath;

        // Save the updated user document
        await user.save();

        res.status(201).send({ message: 'Image uploaded successfully' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    imageUpload
};
