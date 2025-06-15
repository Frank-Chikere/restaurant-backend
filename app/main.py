from fastapi import FastAPI
from app.database import Base, engine
from app.routers import customers, orders
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Restaurant API is Running!"}

Base.metadata.create_all(bind=engine)

app.include_router(customers.router, prefix="/customers", tags=["Customers"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")
