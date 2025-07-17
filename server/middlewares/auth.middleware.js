const jwt = require("jsonwebtoken");

const createAuthToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Le token expirera dans 1 jour
  );
};

// Vérifie que l'utilisateur est authentifié
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé : token manquant." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, username, role, ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

// Vérifie que l'utilisateur a un rôle autorisé
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin?.role)) {
      return res
        .status(403)
        .json({ message: "Accès interdit : privilèges insuffisants." });
    }
    next();
  };
};

module.exports = { createAuthToken, authenticate, authorize };
