CREATE TABLE website_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE website_products(
id SERIAL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_image TEXT,
product_quantity INT
);

CREATE TABLE website_cart(
id SERIAL PRIMARY KEY,
product_id INT REFERENCES website_products(id),
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_quantity INT,
product_image TEXT,
date_added TIMESTAMP
);

INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Wise Owl Hammock', 26.95, 'https://m.media-amazon.com/images/I/81uZkpxEvPL._AC_SX296_SY426_FMwebp_QL65_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Jackery Portable Power Station', 199.99, 'https://m.media-amazon.com/images/I/71z6d03iT8S._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Coleman Gas Stove', 34.99, 'https://m.media-amazon.com/images/I/818e1vgtDkL._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Grill Utensil Caddy', 38.99, 'https://m.media-amazon.com/images/I/712-GAvvFyL._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Gas ONE Propane/Butane Stove', 32.99, 'https://m.media-amazon.com/images/I/61ItEFLd69S._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Coleman Camping Chair', 32.92, 'https://m.media-amazon.com/images/I/81V0ddizPWL._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('RoverTac Multitool Hatchet', 25.99, 'https://m.media-amazon.com/images/I/71U3GkJuW0L._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('FOVAL Car Inverter', 25.98, 'https://m.media-amazon.com/images/I/51wBDH+pUGL._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Ecosmart Electric Heater', 165.00, 'https://m.media-amazon.com/images/I/71tciSltcFL._AC_UL320_.jpg', 0);


INSERT INTO website_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Nemo Riff Sleeping Bag', 419.95, 'https://m.media-amazon.com/images/I/617h-5KNIML._AC_UL320_.jpg', 0);
