INSERT INTO website_users(
    username,
    password
) VALUES ($1,$2)
RETURNING *;
