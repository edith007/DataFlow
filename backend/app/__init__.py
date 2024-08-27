from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config

db = SQLAlchemy()
migrate = Migrate()
socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={r"/*": {"origins": "*"}})
    socketio.init_app(app, cors_allowed_origins="*")

    with app.app_context():
        from .routes import routes
        app.register_blueprint(routes)
        db.create_all()

    return app
