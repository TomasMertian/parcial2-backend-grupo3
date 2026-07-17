return jwt.sing(
    { id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIN: '24h'}
);