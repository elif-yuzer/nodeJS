"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
//*11.31 geride kaldın sewagger autojen ıcın

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    const foundedUser = await User.findOne({
      $or: [{ email }, { username }, password],
    }).lean();

    if (!foundedUser) throw new CustomError("username or email required", 401);

    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active.", 401);
  },
};
