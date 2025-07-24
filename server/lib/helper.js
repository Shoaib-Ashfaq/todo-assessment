import jwt from 'jsonwebtoken';

export const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res
    .status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: 'Lax', // or 'None' for cross-site (with https)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
};
