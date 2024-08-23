from flask import request, jsonify, Blueprint
from .models import Pipeline, db

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
    pipeline = Pipeline(
        name=data['name'],
        description=data['description'],
        source=data['source'],
        destination=data['destination']
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

@routes.route('/pipelines/run', methods=['POST'])
def run_pipeline():
    # Logic to run the pipeline will be implemented here
    return jsonify({'message': 'Pipeline running...'}), 200
