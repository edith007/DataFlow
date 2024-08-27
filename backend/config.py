import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:mysecretpassword@db:5432/dataflow")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
