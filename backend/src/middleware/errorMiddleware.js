export const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.code === 11000) {
    return res.status(409).json({ message: "Resource already exists" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(error.errors)
        .map((value) => value.message)
        .join(", ")
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource id" });
  }

  res.status(statusCode).json({
    message: error.message || "Server error"
  });
};
