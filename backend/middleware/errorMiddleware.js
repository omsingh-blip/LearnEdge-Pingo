const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    msg:
      err.message || "Internal Server Error",
  });
};

export default errorMiddleware;