const db = require('../model/db');
const list = require('../model/list');
const {userInfos, lists} = db;

// userInfos.create(
//     {
//       name: 'ethan',
//       account: 123123123,
//       password: '123abc',
//       email: '123123@gmail.com'
//     }, (err) => {
//         if(!err) console.log('success')
//     }
// )

async function allList(params = {}){
  const result  = await lists.find(params, {_id: 0});
  return result;
}

async function findList(params = {}){
  const result  = await userInfos.find(params, {_id: 0, __v: 0});
  return result;
}

async function findItem(params = {}){
  const total = await lists.countDocuments();
  const result  = await lists.find({}, {_id: 0, __v: 0}).limit(params.limit).skip(params.skip);
  return Promise.resolve({list: result, total});
}

async function userRegister(params){
  const namepar = {name: params.name}
  const accountpar = {account: params.account}
  const findResult = await findList({$or: [namepar, accountpar]});
  if(findResult.length){
    return Promise.reject('repeat 用户名或账号已存在')
  }
  const length = await userInfos.find({}).countDocuments();
  const result = await userInfos.create({
    userId: length + 100000,
    ...params
  });
  return result;
}

async function userLogin(params){
  const findResult = await findList(params);
  if(findResult.length === 1){
    return 1;
  }
  return null;
}

module.exports = {
  findList,
  userRegister,
  allList,
  userLogin,
  findItem
};