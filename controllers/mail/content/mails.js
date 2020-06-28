module.exports = {
  verificationMail: (Name, Token) => {
    return `Hi ${Name}, Welcome to Edudictive. <br /> Please use this link to verify your account <a href='https://www.edudictive.in/user/verify?token=${Token}'>Click Here</a>`;
  },
};
