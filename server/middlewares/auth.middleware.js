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

// Vérifie le token d'authentification
const verifyToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        valid: false,
        message: "Accès non autorisé : token manquant.",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ valid: false, message: "Token invalide ou expiré." });

      return res.status(200).json({ valid: true, admin: decoded });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ valid: false, message: "Erreur interne du serveur." });
  }
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
        .json({ message: "Access denied: insufficient privileges." });
    }
    next();
  };
};

module.exports = { createAuthToken, authenticate, authorize, verifyToken };
