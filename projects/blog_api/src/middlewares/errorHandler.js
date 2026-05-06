const errorHandler=(err,req,res,next)=>{
    res.status(400).send({
        error:true,
        message: "hata" || err.message,
        cause:err.cause,
        stack:err.stack
    })
}

module.exports=errorHandler


//**
//?Express.js'in mimarisinde çok katı bir kural vardır: Bir fonksiyonun parametrelerinde tam olarak 4 tane sihirli kelime (err, req, res, next) yan yana duruyorsa, Express bunun sıradan bir garson olmadığını, bunun uygulamanın "Kriz Masası" (Global Error Handler) olduğunu anlar. Bu su demek uygulamanın verı tabanı coktu veya musterı yanlıs bı ıstek attıgında server ıcerısındekı bu global error yakalayıcısı yakalıyorc
// ?error: true (Bayrak): Karşı tarafın (Frontend) uzun uzun mesajları okumasına gerek kalmadan, sadece bu "true" değerine bakarak ekranda anında kırmızı bir hata kutusu çıkarmasını sağlayan tetikleyicidir.message: err.message (İnsan Dili): Hatanın ne olduğunu anlatan, son kullanıcının veya geliştiricinin okuyup anlayabileceği metindir (Örn: "Şifre çok kısa" veya "Aradığınız ürün bulunamadı").cause: err.cause (Kök Sebep): Bir hata başka bir hatayı tetikleyebilir (Zincirleme kaza gibi). Bu özellik, hatayı başlatan ilk asıl sebebi (kökstack: err.stack (Olay Yeri İnceleme): Hatanın projedeki hangi dosyanın, hangi fonksiyonunun, kaçıncı satırında meydana geldiğini gösteren detaylı teknik haritadır.  */ nedeni) gösterir.





