return jwt.sign(
    { id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIN: '24h'}
);

const token = authHeader.split(' ')[1];

const decoded = jwt.verify(token, process.env.JWT_SECRET)
req.user = decoded;
next();