"""Alembic migration environment for IPOBazar.

This file tells Alembic:
  * where the models' metadata lives (for `--autogenerate`), and
  * which database URL to use (taken from our application settings, so the
    migration tool and the app always agree on the target database).
"""
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from app.core.config import get_settings
from app.db.base import Base

# Alembic Config object, giving access to values in alembic.ini.
config = context.config

# Configure Python logging from the alembic.ini file.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Point Alembic at the application's settings so `alembic` and `uvicorn` use the
# exact same database connection string.
settings = get_settings()
config.set_main_option("sqlalchemy.url", settings.database_url)

# Metadata for 'autogenerate' support. Importing models (in later phases) will
# register their tables on this Base.
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode (emit SQL without a DB connection)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode (with a live database connection)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
