const mongoose = require('mongoose');

const getConnection = async () => {

    try {

    const url ='mongodb+srv://guillermoosorio:Juan9057+@cluster0.fcwx3.mongodb.net/ing-web-inv?retryWrites=true&w=majority&appName=Cluster0'

    await mongoose.connect(url);
    console.log('conexion exitosa!');

    } catch(error){
        console.log(error);
    }
}
    module.exports = {
        getConnection,
    }
    
