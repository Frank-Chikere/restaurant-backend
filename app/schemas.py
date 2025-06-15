from pydantic import BaseModel
from datetime import date
from typing import Optional, List

# Order schemas
class OrderBase(BaseModel):
    order_date: date
    menu_item: str
    special_instructions: Optional[str] = None
    payment_method: str
    next_reservation_date: Optional[date] = None

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    #customer_id: int
    status: str

    class Config:
        orm_mode = True


# Customer schemas
class CustomerBase(BaseModel):
    first_name: str
    surname: str
    middle_name: Optional[str]
    date_of_birth: date
    home_address: str
    date_of_registration: date
    #_24120111112: bool  # Replace this with your matric number if needed

class CustomerCreate(CustomerBase):
    orders: List[OrderCreate] = []

class Customer(CustomerBase):
    id: int
    orders: List[Order] = []

    class Config:
        orm_mode = True
