const userInfo = require('../service/user');

const {findList, userRegister, allList, userLogin, findItem} = userInfo;

function selectData(){
  return findList();
}

function addUser(param = {}){
  return userRegister(param)
}

function selectALl(){
  return allList()
}

function login(param = {}){
  let newPar = Object.assign({}, param);
  return userLogin(newPar);
}

function findItemList(param){
  let {start = 1, limit = 10} = param;
  start = Number(start);
  limit = Number(limit);
  let skip = start === 1 ? 0 : start;
  if(start && start !== 1){
    skip = ((start - 1) * limit);
  }
  let selectParam = {
    skip,
    limit
  }
  return findItem(selectParam)
}

module.exports = {
  selectData,
  addUser,
  selectALl,
  login,
  findItemList
}