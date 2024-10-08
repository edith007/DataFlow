import os
import requests
import pandas as pd
import sqlalchemy
from flask_socketio import emit
from sqlalchemy import create_engine
from app.models import db, Pipeline
from app import socketio
from datetime import datetime, timezone

def fetch_data(source):
    """
    Fetches data from the specified source.
    Supports CSV files, JSON files, and API endpoints.
    """
    try:
        if source.lower().endswith(".csv"):
            if not os.path.exists(source):
                raise FileNotFoundError(f"The file {source} does not exist.")
            data = pd.read_csv(source)
        elif source.lower().endswith(".json"):
            if not os.path.exists(source):
                raise FileNotFoundError(f"The file {source} does not exist.")
            data = pd.read_json(source)
        elif source.startswith("http://") or source.startswith("https://"):
            response = requests.get(source)
            response.raise_for_status()
            data = pd.json_normalize(response.json())
        else:
            raise ValueError(
                "Unsupported data source format. Supported formats are .csv, .json, and API endpoints."
            )
        return data
    except Exception as e:
        print(f"Error fetching data from source: {source}, Error: {str(e)}")
        raise

def transform_data(data):
    """
    Currently, no transformations are applied.
    """
    return data

def load_data(data, destination, table_name):
    """
    Loads the data into the specified destination.
    Assumes the destination is a PostgreSQL database URI.
    """
    try:
        engine = create_engine(destination)
        data.to_sql(table_name, engine, if_exists="replace", index=False)
    except sqlalchemy.exc.OperationalError as oe:
        print(f"Database connection error: {str(oe)}")
        raise
    except Exception as e:
        print(f"Error loading data to destination: {destination}, Error: {str(e)}")
        raise

def run_pipeline(pipeline_id):
    """
    Executes the pipeline: fetches and loads the data.
    Updates the pipeline status accordingly.
    """
    pipeline = Pipeline.query.get(pipeline_id)

    if pipeline is None:
        raise ValueError(f"Pipeline with ID {pipeline_id} does not exist.")

    try:
        print(
            f"Running pipeline {pipeline_id}: Fetching data from source {pipeline.source}"
        )
        emit_status_update(pipeline_id, "Running")
        data = fetch_data(pipeline.source)
        print(
            f"Pipeline {pipeline_id}: Loading data to destination {pipeline.destination}"
        )
        load_data(data, pipeline.destination, pipeline.name)

        pipeline.status = "Completed"
        pipeline.last_run = datetime.now(timezone.utc)
        pipeline.error_message = None
        print(f"Pipeline {pipeline_id} completed successfully.")
        emit_status_update(pipeline_id, "Completed")
    except Exception as e:
        pipeline.status = "Failed"
        pipeline.error_message = str(e)
        print(f"Pipeline {pipeline_id} failed due to error: {e}")
        emit_status_update(pipeline_id, "Failed")
        raise e
    finally:
        db.session.commit()

def emit_status_update(pipeline_id, status):
    """
    Emits a status update for a specific pipeline.
    """
    socketio.emit("pipeline_status", {"pipeline_id": pipeline_id, "status": status})

def get_current_stage():
    # This is a helper function to determine where the error occurred
    # Can be expanded to provide more detailed stage information
    import traceback
    tb = traceback.extract_stack()
    stage = tb[-2].name
    return stage
