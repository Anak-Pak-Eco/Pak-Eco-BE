const {Filter} = require('@google-cloud/firestore');
const firebaseApp = require('../configs/firebase');

module.exports = {
  getPlants: async (req, res) => {
    try {
      const {
        users_id: usersId,
      } = req.query;

      let plants = firebaseApp.firestore()
          .collection('plants');

      if (usersId) {
        plants = plants.where(
            Filter.or(
                Filter.where('users_id', '==', usersId),
                Filter.where('users_id', '==', null),
            ),
        );
      } else {
        plants = plants.where('users_id', '==', null);
      }

      plants = await plants.get();

      return res.status(200).json({
        message: 'Success to get plants',
        status_code: 200,
        data: plants.docs.map((snapshot) => {
          return snapshot.data();
        }),
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to send notification',
        status_code: 400,
        data: e.message,
      });
    }
  },
  addPlants: async (req, res) => {
    try {
      const {
        name,
        image_url: imageUrl,
        users_id: usersId,
        phases,
      } = req.body;

      const plants = await firebaseApp.firestore()
          .collection('plants')
          .add({
            name,
            image_url: imageUrl,
            users_id: usersId,
            phases,
          });

      return res.status(200).json({
        message: 'Success to create plants',
        status_code: 200,
        data: plants.docs,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to create plants',
        status_code: 400,
        data: e.message,
      });
    }
  },
};
