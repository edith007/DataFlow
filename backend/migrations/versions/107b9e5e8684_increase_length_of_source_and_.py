"""Increase length of source and destination columns

Revision ID: 107b9e5e8684
Revises: 
Create Date: 2024-08-23 12:05:06.779725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '107b9e5e8684'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pipeline', schema=None) as batch_op:
        batch_op.alter_column('source',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=200),
               existing_nullable=False)
        batch_op.alter_column('destination',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=200),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pipeline', schema=None) as batch_op:
        batch_op.alter_column('destination',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)
        batch_op.alter_column('source',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)

    # ### end Alembic commands ###
