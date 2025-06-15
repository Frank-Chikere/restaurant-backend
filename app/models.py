from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    surname = Column(String)
    middle_name = Column(String)
    date_of_birth = Column(Date)
    home_address = Column(String)
    date_of_registration = Column(Date)
    #_24120111112 = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="customer")


class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    order_date = Column(Date)
    menu_item = Column(String)
    special_instructions = Column(String)
    payment_method = Column(String)
    next_reservation_date = Column(Date)
    status = Column(String, default="pending")

    customer = relationship("Customer", back_populates="orders")
