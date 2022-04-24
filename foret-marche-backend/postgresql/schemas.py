from sqlalchemy import create_engine, MetaData, Table, Integer, String, Sequence ,Column, DateTime, ForeignKey, Numeric
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    user_id = Column(Sequence, primary_key=True)
    phone_number = Column(String(50), nullable=False)

class Offers(Base):
    __tablename__ = 'offers'
    offer_id = Column(Sequence, primary_key=True)
    seller_id = Column(Sequence, ForeignKey(Users.user_id), primary_key=True)
    product_name = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)

class Bids(Base):
    __tablename__ = 'bids'
    bid_id = Column(Sequence, primary_key=True)
    offer_id = Column(Sequence, ForeignKey(Offers.offer_id), primary_key=True)
    seller_id = Column(Sequence, ForeignKey(Users.user_id), primary_key=True)
    buyer_id = Column(Sequence, ForeignKey(Users.user_id), primary_key=True)
    quantity = Column(Integer, nullable=False)
