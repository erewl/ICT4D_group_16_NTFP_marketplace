from sqlalchemy import create_engine, MetaData, Table, Integer, String, Sequence ,Column, DateTime, ForeignKey, Numeric
from datetime import datetime

metadata_obj = MetaData()

Users = Table('users', metadata_obj,
    Column('user_id', Integer, primary_key=True, autoincrement=True),
    Column('phone_number', String(50), nullable=False),
    Column('email_address', String(60)),
    Column('nickname', String(50), nullable=False)
)

Offers = Table('offers', metadata_obj, 
    Column('offer_id', Integer, primary_key=True, autoincrement=True),
    Column('seller_id', Integer, ForeignKey("users.user_id")),
    Column('product_name', String(50), nullable=False),
    Column('price', Integer, nullable=False),
    Column('quantity', Integer, nullable=False),
    Column('unit', String(50), nullable=False)
)

Bids = Table('bids', metadata_obj, 
    Column('bid_id',Integer, primary_key=True, autoincrement=True),
    Column('offer_id', Integer, ForeignKey("offers.offer_id")),
    Column('seller_id', Integer, ForeignKey("users.user_id")),
    Column('buyer_id', Integer, ForeignKey("users.user_id")),
    Column('quantity', Integer, nullable=False)
)
