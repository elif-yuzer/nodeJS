import { NextFunction,Request,Response } from "express"
import { error } from "node:console"


const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{


     const statusCode = err.statusCode || 400;


    res.status(statusCode).send({
        error:true,
        message: err.message || "Something went wrong",
        cause:err.cause,
        /* geliştirme sırasında gelen hata */
        stack:process.env.NODE_ENV==="development" ? err.stack: undefined
    })
}




export default errorHandler

//*: 
// Hatanın ne olduğunu anlatan, son kullanıcının veya geliştiricinin okuyup anlayabileceği metindir (Örn: "Şifre çok kısa" veya "Aradığınız ürün bulunamadı").cause: err.cause (Kök Sebep): Bir hata başka bir hatayı tetikleyebilir (Zincirleme kaza gibi). Bu özellik, hatayı başlatan ilk asıl sebebi (kökstack: err.stack (Olay Yeri İnceleme): Hatanın projedeki hangi dosyanın, hangi fonksiyonunun, kaçıncı satırında meydana geldiğini gösteren detaylı teknik haritadır nedeni) gösterir.Neden gizleriz? Stack'te dosya isimleri, klasör yapısı, satır numaraları görünür. Bu bilgiler güvenlik açığı oluşturur.*/