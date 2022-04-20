CREATE TABLE IF NOT EXISTS  "users" ( 
  user_id serial PRIMARY KEY, 
  phone_number VARCHAR ( 50 ) NOT NULL 
);

 CREATE TABLE IF NOT EXISTS "offers" ( 
   offer_id serial PRIMARY KEY,
   seller_id serial NOT NULL,
   product_name VARCHAR ( 50 ) NOT NULL,
   price INT NOT NULL,
   quantity INT NOT NULL, 
      CONSTRAINT fk_seller
      FOREIGN KEY(seller_id) 
	  REFERENCES "users" (user_id)
);

 CREATE TABLE IF NOT EXISTS "bids" (
   bid_id serial PRIMARY KEY,
   offer_id serial NOT NULL,
   seller_id serial NOT NULL,
   buyer_id serial NOT NULL,
   quantity INT NOT NULL, 
      CONSTRAINT fk_offer
      FOREIGN KEY(offer_id) 
	    REFERENCES "offers" (offer_id),
      CONSTRAINT fk_seller
      FOREIGN KEY(seller_id) 
	    REFERENCES "users" (user_id),
      CONSTRAINT fk_buyer
      FOREIGN KEY(buyer_id) 
	    REFERENCES "users" (user_id)
);
 