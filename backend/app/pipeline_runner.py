import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from app.models import db, Pipeline

def fetch_data(source):
    # Assuming source is a CSV file path for simplicity
    data = pd.read_csv(source)
    return data

def transform_data(data):
    # Example transformation: Add a new column and drop another
    data['new_column'] = data['existing_column'] * 2
    data.drop(columns=['existing_column'], inplace=True)
    return data

def load_data(data, destination):
    # Assuming destination is a PostgreSQL database URI
    engine = create_engine(destination)
    data.to_sql('pipeline_table', engine, if_exists='replace', index=False)

def run_pipeline(pipeline_id):
    pipeline = Pipeline.query.get(pipeline_id)
    
    try:
        data = fetch_data(pipeline.source)
        transformed_data = transform_data(data)
        load_data(transformed_data, pipeline.destination)
        
        pipeline.status = 'Completed'
        pipeline.last_run = datetime.utcnow()
    except Exception as e:
        pipeline.status = 'Failed'
        raise e
    finally:
        db.session.commit()
