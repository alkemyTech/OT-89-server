//Será la api key cuando la tengamos en el entorno de producción
const prodConfig={
    SENDGRID_API_KEY:process.env.SENDGRID_API_KEY
}
module.exports=prodConfig;