from app import create_app, socketio

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=False) // Running the application in debug mode (debug flag is set to True in run) is a security risk if the application is accessible by untrusted parties.
