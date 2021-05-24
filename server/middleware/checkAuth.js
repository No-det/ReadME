const admin = require("firebase-admin");

module.exports = (req, res, next) => {
  const serviceAccount = require(process.env.NODE_ENV === "development"
    ? "../serviceAccountKey.json"
    : JSON.parse(process.env.SERVICE_ACCOUNT_KEY));
  if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  const idToken = req?.headers?.authorization?.split(" ")[1];
  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;
        next();
      })
      .catch((err) => {
        console.log("Error: ", err);
        return res.status(401).json({
          success: false,
          message: "Not Authorized!",
        });
      });
  } else
    return res.status(401).json({ success: false, message: "Not Authorized" });
};
