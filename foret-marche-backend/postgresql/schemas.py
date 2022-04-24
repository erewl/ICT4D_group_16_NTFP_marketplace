from sqlalchemy import create_engine, MetaData, Table, Integer, String, Sequence ,Column, DateTime, ForeignKey, Numeric
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    phone_number = Column(String(50), nullable=False)

class Offers(Base):
    __tablename__ = 'offers'
    offer_id = Column(Integer, primary_key=True, autoincrement=True)
    seller_id = Column(Integer, ForeignKey(Users.user_id))
    product_name = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)

class Bids(Base):
    __tablename__ = 'bids'
    bid_id = Column(Integer, primary_key=True, autoincrement=True)
    offer_id = Column(Sequence, ForeignKey(Offers.offer_id))
    seller_id = Column(Sequence, ForeignKey(Users.user_id))
    buyer_id = Column(Sequence, ForeignKey(Users.user_id))
    quantity = Column(Integer, nullable=False)
