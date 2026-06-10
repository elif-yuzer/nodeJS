"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const { list, read, create, update, deletee } = require("../controllers/pizza");

// upload (multer middleware)
//npm i multer
//upload adında bır degısken olusturarak multerı kullanarak optionlar gonderıyoruz.Bu optionların ıcerısınde destınatıon dedıgımz noktalar var nedır bu destinationlar.dosyaları kaydettıgım klasorun yolu sonrasında upload.single(image) image fiekdını gonderıorm

const multer = require("multer");
const upload = multer({
 // dest: "../uploads",
 storage:multer.diskStorage({
    destination:'../uploads',  //indicate dest gidecegi yeri gosteriyor
    filename:function(req,file,cb){
        console.log('file--',file);
        
    }


 })

});

router.route("/").get(list).post(
  upload.single("image"),
  // upload.array("image"),
  // upload.any(),

  create,
);
router.route("/:id").get(read).put(update).delete(deletee);
/* ------------------------------------------------------- */

/* ------------------------------------------------------- */
module.exports = router;
