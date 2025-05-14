from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    username: Mapped[str] = mapped_column(unique=True, nullable=True)
    firstname: Mapped[str] = mapped_column(String(80), nullable=True)
    lastname: Mapped[str] = mapped_column(String(80), nullable=True)
    dateofbirth: Mapped[str] = mapped_column(nullable=True)
    phone: Mapped[str] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username if self.username else None,
            "firstname": self.firstname if self.firstname else None,
            "lastname": self.lastname if self.lastname else None,
            "dateofbirth": self.dateofbirth if self.dateofbirth else None,
            "phone": self.phone if self.phone else None,
            # do not serialize the password, its a security breach
        }