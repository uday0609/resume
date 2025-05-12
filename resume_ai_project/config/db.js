const {Pool} = require('pg');

const pool=new Pool({
        user: 'postgres',
        host:'localhost',
        database:'resume_compare',
        password:'root',
        port:5432
});

pool.connect()
    .then(()=>{
        console.log('Connected to the postgreSQL database');
    })
    .catch((err)=>{
        console.log('Error connecting to the database', err);
    });
module.exports=pool;