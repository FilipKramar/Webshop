CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  price FLOAT
);
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price FLOAT,
  picture VARCHAR(255),
  quantity INT,
  cart_id BIGINT,
  FOREIGN KEY (cart_id) REFERENCES cart(id)
);


