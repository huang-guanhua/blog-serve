const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: Number,
    name: String,
    account: String,
    password: String,
    // age: Number,
    // title: Array,
    // hobby: {
    //     type: String,
    //     default: 'run'
    // },
    email: String,
    createDate: {
        type: Date,
        default: Date.now
    }
})

// UserInfo.create(
//     {
//         name: 'Ethan123',
//         age: 23123,
//         address: 'shenzhen',
//         other: ['666', 'niu']
//     }, (err) => {
//         if(!err) console.log('success')
//     }
// )

// UserInfo.find({},(err, docs) => {
//     if(!err) console.log(docs);
// })

module.exports = mongoose.model('userInfos', userSchema);