return jwt.sing(
    { id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIN: '24h'}
);

const token = authHeader.split(' ')[1];
