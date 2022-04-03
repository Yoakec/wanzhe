    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'wanzhe'
    });
    connection.connect();

    function execSQL(sql) {
        const Sqlpromise = new Promise((res, rej) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    rej(err)
                    return
                }
                res(result)
            })

        })
        return Sqlpromise
    }
module.exports ={
    execSQL
}