const jwt = require('jsonwebtoken');

const customError=require('../helpers/customError')

module.exports=async(req,res,next)=>{

    //*kullanıcı dolu gelse bıle burda bos bir etiketle baska birinin yaka kartını takmıs bıle olsa burda onu engellıyorm
    //*kapıdakı guvenlık gorevlısının tek gorevi var bu kısı kım?
    //Bileti varsa UV ışığına tutar, kimliğini okur ve yakasına asar (req.user = {...}).
    //Bileti yoksa veya sahteyse yakasına "Ziyaretçi" yazar (req.user = null) ve onu içeri (next()) gönderir.
    //Kovma işini ise içerideki kapılarda duran Müdür (Permissions) yapar. Müdür sadece req.user objesine bakar: "Eğer burası sadece Adminlere özelse ve req.user null ise, seni buradan kovarım" der. İş bölümü kusursuz işler.
    req.user=null

    const auth=req?.headers.authorization
    const tokenArr=auth ? auth.split(' ') : null


    const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

}


