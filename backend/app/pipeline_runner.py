import os
import requests
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from app.models import db, Pipeline
from datetime import datetime, timezone

def fetch_data(source):
    """
    Fetches data from the specified source.
    Supports CSV files, JSON files, and API endpoints.
    """
    if source.lower().endswith('.csv'):
        if not os.path.exists(source):
            raise FileNotFoundError(f"The file {source} does not exist.")
        data = pd.read_csv(source)
    elif source.lower().endswith('.json'):
        if not os.path.exists(source):
            raise FileNotFoundError(f"The file {source} does not exist.")
        data = pd.read_json(source)
    elif source.startswith('http://') or source.startswith('https://'):
        response = requests.get(source)
        response.raise_for_status()
        data = pd.json_normalize(response.json())
    else:
        raise ValueError("Unsupported data source format. Supported formats are .csv, .json, and API endpoints.")
    
    return data

def transform_data(data, source_type):
    """
    Currently, no transformations are applied.
    """
    return data  # No transformation is applied

def load_data(data, destination, table_name):
    """
    Loads the data into the specified destination.
    Assumes the destination is a PostgreSQL database URI.
    """
    engine = create_engine(destination)
    data.to_sql(table_name, engine, if_exists='replace', index=False)

def run_pipeline(pipeline_id):
    """
    Executes the pipeline: fetches and loads the data.
    Updates the pipeline status accordingly.
    """
    pipeline = Pipeline.query.get(pipeline_id)
    
    if pipeline is None:
        raise ValueError(f"Pipeline with ID {pipeline_id} does not exist.")
    
    try:
        # Determine the source type
        if pipeline.source.endswith('.csv'):
            source_type = 'csv'
        elif pipeline.source.endswith('.json'):
            source_type = 'json'
        elif pipeline.source.startswith('http://') or pipeline.source.startswith('https://'):
            source_type = 'api'
        else:
            raise ValueError("Unsupported source type.")
        
        data = fetch_data(pipeline.source)
        # No transformation step is applied here
        load_data(data, pipeline.destination, pipeline.name)
        
        pipeline.status = 'Completed'
        pipeline.last_run = datetime.now(timezone.utc)
    except Exception as e:
        pipeline.status = 'Failed'
        print(f"Pipeline {pipeline_id} failed due to error: {e}")
        raise e
    finally:
        db.session.commit()

def get_current_stage():
    # This is a helper function to determine where the error occurred
    # Can be expanded to provide more detailed stage information
    import traceback
    tb = traceback.extract_stack()
    stage = tb[-2].name
    return stage
