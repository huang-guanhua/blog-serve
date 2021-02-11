const nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置👻
const config = {
  host: "smtp.aliyun.com",
  // service: "aliyun", // 默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等
  // port: 25, // ssl 465
  secure: true,
  auth: {
      user: 'huangguanhuablog@aliyun.com',
      pass: 'huangguanhua.' // ZRZZVDEVLRRLZGXP
  }
}

const sendUserConfig = (emailUrl, content) => ({
  from: '"blog" <huangguanhuablog@aliyun.com>', // sender address
  to: emailUrl, // list of receivers
  subject: "send ✔", // Subject line
  text: "Hello world?", // plain text body
  html: `
    <html>
      <body>
        <div>${content}</div>
        <div>来自hgh博客的提醒邮件👻</div>
        <div>${new Date().toLocaleString()}</div>
        <div>--blog</div>
      </body>
    </html>
  `,
})

async function sendEmail(data){
  const {type = 1, url = '', content = ''} = data; // TODO 邮箱地址正则验证
  const Account = await nodemailer.createTransport(config);
  return Account.sendMail(sendUserConfig(url, content))
}


module.exports = {
  sendEmail
}