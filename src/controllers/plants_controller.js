const {Filter} = require('@google-cloud/firestore');
const firebaseApp = require('../configs/firebase');

const plantRef = 'plants';

module.exports = {
  getPlants: async (req, res) => {
    try {
      const {
        users_id: usersId,
        user_only: userOnly,
      } = req.query;

      let plants = firebaseApp.firestore()
          .collection(plantRef);

      if (usersId) {
        if (userOnly == 'true') {
          plants = plants.where(
              Filter.or(
                  Filter.where('users_id', '==', usersId),
              ),
          );
        } else {
          plants = plants.where(
              Filter.or(
                  Filter.where('users_id', '==', usersId),
                  Filter.where('users_id', '==', null),
              ),
          );
        }
      } else {
        plants = plants.where('users_id', '==', null);
      }

      plants = await plants.get();

      return res.status(200).json({
        message: 'Success to get plants',
        status_code: 200,
        data: plants.docs.map((snapshot) => {
          return {id: snapshot.id, ...snapshot.data()};
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
          .collection(plantRef)
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
  editPlants: async (req, res) => {
    try {
      const {id} = req.params;
      const {
        name,
        image_url: imageUrl,
        users_id: usersId,
        phases,
      } = req.body;
      const plant = await firebaseApp.firestore()
          .collection(plantRef)
          .doc(id)
          .get();

      if (plant.exists) {
        let plantUpdated = firebaseApp.firestore()
            .collection(plantRef)
            .doc(id);

        if (name) {
          await plantUpdated.update({
            name,
          });
        }

        if (imageUrl) {
          await plantUpdated.update({
            image_url: imageUrl,
          });
        }

        if (usersId) {
          await plantUpdated.update({
            users_id: usersId,
          });
        }

        if (phases) {
          await plantUpdated.update({
            phases,
          });
        }

        plantUpdated = await plantUpdated.get();

        return res.status(200).json({
          message: 'Success to update plants',
          status_code: 200,
          data: plantUpdated.data(),
        });
      } else {
        return res.status(404).json({
          message: 'Failed to update plants',
          status_code: 404,
          data: e.message,
        });
      }
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to create plants',
        status_code: 400,
        data: e.message,
      });
    }
  },
  deletePlant: async (req, res) => {
    const {id} = req.params;

    await firebaseApp.firestore()
        .collection(plantRef)
        .doc(id)
        .delete();

    try {
      await firebaseApp.database().ref(plantRef).child(id).remove();
      return res.status(200).json({
        message: 'Success to delete plant',
        status: false,
        data: null,
      });
    } catch (e) {
      return res.status(400).json({
        message: 'Failed to delete plant',
        status: false,
        data: e.message,
      });
    }
  },
};
