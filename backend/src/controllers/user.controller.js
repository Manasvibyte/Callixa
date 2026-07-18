export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully.",
    user: req.user,
  });
};
