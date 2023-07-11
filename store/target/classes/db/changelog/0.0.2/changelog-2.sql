INSERT INTO product (name, price, picture, quantity, cart_id)
VALUES
    ('unicorn slippers', 19.99, 'https://m.media-amazon.com/images/I/61okxKsrR6L._AC_UY1000_.jpg', 0, NULL),
    ('inflatable dinosaur costume', 39.99, 'https://m.media-amazon.com/images/I/91w-z3hEn9L._AC_UF1000,1000_QL80_.jpg', 0, NULL),
    ('banana-shaped umbrella', 14.99, 'https://m.media-amazon.com/images/I/51wKKtQQ29S._AC_UY1100_.jpg', 0, NULL),
    ('Pickle-Flavored Toothpaste', 9.99, 'https://www.amusingfoodie.com/wp-content/uploads/2011/03/PAST-2070.jpg', 0, NULL),
    ('Fish Slippers', 14.99, 'https://m.media-amazon.com/images/I/814wCc4XY5L._AC_UY1000_.jpg', 0, NULL),
    ('Crazy Cat Lady Action Figure Set', 49.99, 'https://m.media-amazon.com/images/I/91-nutAsiGL._AC_UF894,1000_QL80_.jpg', 0, NULL),
    ('Bacon-Scented Candle', 12.99, 'https://m.media-amazon.com/images/I/4198zMJj4JL._AC_.jpg', 0, NULL),
    ('Bubble Wrap Suit', 34.99, 'https://images.vat19.com/bubble-wrap-costume/bubble-wrap-suit-components.jpg', 0, NULL);


-- Add an instance to the cart table
INSERT INTO cart (price) VALUES (0.0);