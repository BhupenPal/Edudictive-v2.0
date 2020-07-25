module.exports = {
  verificationMail: (Name, Token) => {
    return `Hi ${Name}, Welcome to Edudictive. <br /> Please use this link to verify your account <a href='https://www.edudictive.in/user/verify?token=${Token}'>Click Here</a>`;
  },
  resetMail: (Name, Token) => {
    return `Hi ${Name}, Click the following link to reset your password. <br /> <a href='https://www.edudictive.in/user/verify?token=${Token}'>Click Here</a>`;
  }
}
