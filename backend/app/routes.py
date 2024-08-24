from flask import request, jsonify, Blueprint
from .models import Pipeline, db
from .pipeline_runner import run_pipeline as execute_pipeline

routes = Blueprint('routes', __name__)

@routes.route('/')
def home():
    return "Welcome to the DataFlow API!"

@routes.route('/pipelines', methods=['GET'])
def get_pipelines():
    pipelines = Pipeline.query.all()
    return jsonify([pipeline.to_dict() for pipeline in pipelines])

@routes.route('/pipelines', methods=['POST'])
def create_pipeline():
    data = request.get_json()

    # Validate the data_type
    if 'data_type' not in data or data['data_type'] not in ['csv', 'json', 'api']:
        return jsonify({'error': 'Invalid data_type. Must be "csv", "json", or "api".'}), 400

    # Check if a pipeline with the same name, source/destination, and data_type already exists
    existing_pipeline = Pipeline.query.filter_by(
        name=data['name'],
        source=data['source'],
        destination=data['destination'],
        data_type=data['data_type']  # Include data_type in the duplicate check
    ).first()

    if existing_pipeline:
        return jsonify({'error': 'A pipeline with the same name, configuration, and data_type already exists.'}), 409

    pipeline = Pipeline(
        name=data['name'],
        description=data['description'],
        source=data['source'],
        destination=data['destination'],
        data_type=data['data_type']  # Include data_type in the pipeline creation
    )
    db.session.add(pipeline)
    db.session.commit()
    return jsonify(pipeline.to_dict()), 201

@routes.route('/pipelines/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def pipeline_detail(id):
    pipeline = Pipeline.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(pipeline.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()

        # Check if the new name, source, or destination already exists in another pipeline
        existing_pipeline = Pipeline.query.filter(
            Pipeline.id != id,
            Pipeline.name == data['name'],
            Pipeline.source == data['source'],
            Pipeline.destination == data['destination']
        ).first()

        if existing_pipeline:
            return jsonify({'error': 'Another pipeline with the same name or configuration already exists.'}), 409

        pipeline.name = data['name']
        pipeline.description = data['description']
        pipeline.source = data['source']
        pipeline.destination = data['destination']
        db.session.commit()
        return jsonify(pipeline.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(pipeline)
        db.session.commit()
        return '', 204

@routes.route('/pipelines/run/<int:id>', methods=['POST'])
def run_pipeline(id):
    """
    Endpoint to trigger the execution of a specific pipeline by ID.
    """
    try:
        execute_pipeline(id)
        return jsonify({'message': f'Pipeline {id} running successfully.'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to run pipeline {id}: {str(e)}'}), 500
