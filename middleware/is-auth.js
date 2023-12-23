const jwt = require("jsonwebtoken");

function return401Error(response, error) {
  return response.status(401).json({
    error: error,
  });
}

module.exports = (req, res, next) => {
  const headers = req.headers;
  const token = headers["authorization"]?.split(" ")?.[1];

  if (token === null || token === "" || token === undefined) {
    console.log("Token not present");
    return return401Error(res, {
      error: {
        name: "TokenExpiredError",
      },
    });
  }

  try {
    jwt.verify(token, "secretCodeForJwtToEncodeAndDecode");
  } catch (err) {
    console.log("Token expired");
    return return401Error(res, err);
  }
  next();
};
