// config.js
module.exports = {
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://Utkarsh:12345@atlascluster.d9acgf5.mongodb.net/guestara",
  port: process.env.PORT || 3000,
};
