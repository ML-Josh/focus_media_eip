const controller = async (req, res, next) => {
  try {
    if (res.locals.__jwtError) throw res.locals.__jwtError;
    res.json({
      status: 'OK',
      data: res.locals.__jwtPayload,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = controller;
