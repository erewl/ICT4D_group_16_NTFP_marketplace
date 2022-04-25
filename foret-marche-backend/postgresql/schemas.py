from sqlalchemy import MetaData, Integer, String, Column, ForeignKey
from sqlalchemy.orm import declarative_base

metadata_obj = MetaData()

Base = declarative_base()

class Users(Base):
     __tablename__ = "users"
     user_id = Column(Integer, primary_key=True, autoincrement=True)
     phone_number = Column(String(50), nullable=False)
    #  email_address = Column(String(60), nullable = True)
    #  nickname = Column(String(50), nullable=True)

class Offers(Base): 
     __tablename__ = "offers"
     offer_id = Column(Integer, primary_key=True, autoincrement=True)
     seller_id = Column(Integer, ForeignKey("users.user_id"))
     product_name = Column(String(50), nullable=False)
     price = Column(Integer, nullable=False)
     quantity = Column(Integer, nullable=False)
     unit = Column(String(50), nullable=False)

class Bids(Base):
     __tablename__ = "bids"
     bid_id = Column(Integer, primary_key=True, autoincrement=True)
     offer_id = Column( Integer, ForeignKey("offers.offer_id"))
     seller_id = Column( Integer, ForeignKey("users.user_id"))
     buyer_id = Column( Integer, ForeignKey("users.user_id"))
     quantity = Column( Integer, nullable=False)