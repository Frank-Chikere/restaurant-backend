from sqlalchemy.orm import Session
from . import models, schemas

# --- Customer CRUD ---

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(
        first_name=customer.first_name,
        surname=customer.surname,
        middle_name=customer.middle_name,
        date_of_birth=customer.date_of_birth,
        home_address=customer.home_address,
        date_of_registration=customer.date_of_registration,
        #_24120111112=customer._24120111112
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)


    
    # Create any orders linked to this customer
    for order in customer.orders:
        db_order = models.Order(
            **order.dict(),
            customer_id=db_customer.id
        )
        db.add(db_order)

    db.commit()
    db.refresh(db_customer)
    return db_customer




def get_customers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Customer).offset(skip).limit(limit).all()


def get_customer_by_id(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()

def update_customer(db: Session, customer_id: int, updated_data: schemas.CustomerCreate):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        return None
    
    for key, value in updated_data.dict().items():
        setattr(db_customer, key, value)

    db.commit()
    db.refresh(db_customer)
    return db_customer


def delete_customer(db: Session, customer_id: int):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        return None
    
    db.delete(db_customer)
    db.commit()
    return db_customer

# --- Order CRUD ---

def create_order(db: Session, order: schemas.OrderCreate, customer_id: int):
    db_order = models.Order(**order.dict(), customer_id=customer_id)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()


