const mongoose = require('mongoose');

mongoose.connect('mongodb://blog:blog@127.0.0.1:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', function() {
    console.log('database connect success')
})

// 连接其他数据库
// const lists = mongoose.createConnection('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
// lists.on('connected',function(err){
//     if(err){
//         console.log('连接数据库失败：'+err);
//     }else{
//         console.log('连接数据库成功！');
//     }
// });
// const usersdb = test.model('users', new mongoose.Schema({email: String, profile: Object}))
// usersdb.find({},(err, docs) => {
//     if(!err) console.log(docs);
// })
// usersdb.create(
//     {
//         profile:{
//             "name":'123',
//             "picture":"https://avatars1.githubusercontent.com/u/46123417?v=4",
//             "location":null,
//             "website":""
//         },
//         email:"11111111112203@163.com",
//         github:"4612417",
//     }
// )

// 连接数据库其他集合，查询，如果要插入修改，必须new mongoose.Schema({})中的参数对象，填写对应集合中的数据结构
// 列如 new mongoose.Schema({name: String, age: Number}), 方可插入已声明的字段， 连接其他db,一样
// const infos = mongoose.model('infos', new mongoose.Schema({}));
// infos.find({},(err, docs) => {
//     if(!err) console.log(docs);
// })

module.exports = {
    userInfos: require('./user'),
    lists: require('./list')
}
