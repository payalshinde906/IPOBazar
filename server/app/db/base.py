"""Declarative base class for all SQLAlchemy models.

Every ORM model inherits from `Base`, which lets Alembic auto-generate
migrations by comparing model metadata against the live database.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Shared declarative base for all models."""
