const express = require("express");

const model = require('../model/fileModel');
const folderBuilder = require('../helper/folderBuilder')
var path = require('path');
const { resolve } = require("path");
const { rejects } = require("assert");
const { checkPrime } = require("crypto");




module.exports = {

    //index
    show:function(req,res){
        model.show(function(categories){
            model.file(function(folder){
                model.docs(function(doc){
                    res.render('index',{categories:categories,folder:folder,doc:doc})
                })
            })
         })
    },

    //folder builder
    folder:function(req,res){
        const input = {
            user_id:req.query.userId,
            categories:req.query.category,
            folder_name:req.query.name,
            parent_id:req.query.parentId ?? null
        }

        folderBuilder(req.query.category,req.query.name)
        //insert data
        model.folder(input,function(data){
            res.redirect('back')
        })

    },

    //folder builder
    upload:async function(req,res){
        var store = []
        if(req.files && Object.keys(req.files).length !== 0) {
            var dirname =path.dirname(__dirname);
           

            //array push promise method
            const tOut = (t) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(t)
                  },1000)
                })
              }

        if(Array.isArray(req.files.files)){
            req.files.files.map(async ele => {
                const input = [req.body.folderID,'file',ele.name]
                store.push(tOut(input))
                var pathName = dirname + '/storage/badru/'+req.body.category+'/'+req.body.folderName+'/'+ele.name;
                ele.mv(pathName, function (err) {
                    if(err) throw err
                    console.log('success')
                });
            })
          
            Promise.all(store).then(response =>{
                model.docsAdd(response,function(check){
                    res.redirect('back')
                })
            })
        }else{
            const input = [req.body.folderID,'file',req.files.files.name]
            store.push(tOut(input))
            var pathName = dirname + '/storage/badru/'+req.body.category+'/'+req.body.folderName+'/'+req.files.files.name;
            req.files.files.mv(pathName, function (err) {
                if(err) throw err
                console.log('success')
            });
            Promise.all(store).then(response =>{
                model.docsAdd(response,function(check){
                    res.redirect('back')
                })
            })
           
        }

      
       

        }
        
    },




    files:function(req,res){
        //  console.log(req.query)
       const input = {
         file_id:req.query.folderId
       }
      
        model.docsGet(input,function(data){
          res.json({
             files:data
          })
          
        })
    }


   
}