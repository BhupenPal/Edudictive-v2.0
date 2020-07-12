const multer = require("multer");
const fs = require("fs");

const cUploadManager = multer.diskStorage({
  destination: (req, file, cb) => {
    let courseID = req.body.courseID.toUpperCase();
    if (!fs.existsSync(`assets/Uploads/${courseID}`)) {
      fs.mkdirSync(`assets/Uploads/${courseID}`);
    }

    if (file.fieldname === "cImage") {
      cb(null, `assets/Uploads/${courseID}`);
    } else if (file.fieldname === "cStructure") {
      cb(null, `assets/Uploads/${courseID}`);
    }
  },

  filename: function (req, file, cb) {
    if (file.fieldname === "cImage") {
      let ext = file.originalname.split(".")[1];
      let filename = "cImage" + "." + ext;
      cb(null, filename);
    } else if (file.fieldname === "cStructure") {
      let ext = file.originalname.split(".")[1];
      let filename = "cStructure" + "." + ext;
      cb(null, filename);
    }
  },
});

module.exports = {
  courseUpload: multer({ storage: cUploadManager }).fields([
    { name: "cImage", maxCount: 1 },
    { name: "cStructure", maxCount: 1 },
  ]),
};
