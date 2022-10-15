const db = require('../helper/mysql')

module.exports = {
    show:function(callback){
         var sql = "SELECT * FROM categories"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    file:function(callback){
         var sql = "SELECT * FROM files where user_id = 1"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },
  
    //get files
    docs:function(callback){
         var sql = "SELECT * FROM docs"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    //insert file
    docsAdd:function(input,callback){
        var sql = 'INSERT INTO docs (file_id,type,name) VALUES ?;';
      //  var sql = "`INSERT INTO docs SET ? ";
        db.query(sql,[input],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data)
            }
        })
    },

    //Select file
    docsGet:function(input,callback){
        var sql = 'SELECT * FROM docs WHERE file_id = ?';
      //  var sql = "`INSERT INTO docs SET ? ";
        db.query(sql,[input.file_id],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data)
            }
        })
    },


    folder:function(input,callback){
        var sql = `INSERT INTO files SET ?`;
         db.query(sql,input,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

 
}