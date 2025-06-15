from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, crud
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/customer/{customer_id}", response_model=schemas.Order)
def create_order(customer_id: int, order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db=db, order=order, customer_id=customer_id)


@router.get("/", response_model=list[schemas.Order])
def read_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_orders(db, skip=skip, limit=limit)

@router.put("/{order_id}/cancel", response_model=schemas.Order)
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = "cancelled"
    db.commit()
    db.refresh(order)
    return order