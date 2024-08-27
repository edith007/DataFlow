# DataFlow

https://github.com/user-attachments/assets/455b8ade-03a8-4dbc-81e5-82427bafa960

DataFlow is a project built to simplify the process of moving data from one place to another. It takes data from sources like JSON files, CSV files, or API endpoints, transforms it, and loads it into a PostgreSQL database. This makes it easier to manage and process large datasets from various sources in an organized way.

DataFlow also integrates with Singer.io, a popular tool for ETL (Extract, Transform, Load) processes. In this project, I have set up a MySQL tap to extract data from a MySQL database and a CSV target to load the data into a CSV file. Singer.io’s taps and targets make it simple to connect to different data sources and destinations, streamlining the entire process.

## Features

- `Data Source Integration`: DataFlow can work with various data sources like JSON files, CSV files, and API endpoints. This makes it simple to pull in data from different places.

- `ETL Process Automation`: It automates the process of extracting, transforming, and loading data. DataFlow can take data from different sources, process it, and then load it into a PostgreSQL database for you.

- `Real Time Status Updates`: Real-time updates on pipeline status using WebSockets.

- `Singer.io Integration: DataFlow uses Singer.io` to help with data extraction and loading. For example, it can pull data from a MySQL database using a MySQL tap and then save that data into a CSV file using a CSV target.

- `PostgreSQL Loading`: DataFlow automatically loads processed data into a PostgreSQL database, making it ready for you to query and analyze.

- `Docker Integration`: Implemented full Docker integration for application containerization.

- `Asynchronous Processing`: DataFlow handles data pipelines asynchronously as it can process large datasets without slowing down other tasks.

- `Health Checks and Monitoring`: DataFlow includes built-in health checks to make sure everything is running smoothly. If something goes wrong, you’ll know about it right away.

## Integration

- Prometheus Node Exporter for real-time system metrics
- Docker for containerized development and deployment


## Tech Stack

- Python/flask for backend development
- ReactJS for frontend development
- TailwindCSS for Styling and interactive UI.
- PostgreSQL as the primary data store
- Integrated various data sources like JSON, CSV and any public API endpoint
- Docker for application containerization
- WebSockets for live updates on Pipeline status
- Prometheus Node Exporter for system monitoring

[Project Running Instructions]

## Getting Started


Instructions for setting up and running the project:

1. Make sure Docker and Docker Compose are installed on your machine.
2. Build and run the Docker containers using the command `docker-compose up`.
3. Visit `https://localhost:5001/` to access the Backend application.
4. Visit `https://localhost:3000/` to access the frontend application.
5. Visit `http://localhost:9090/graph` to access the Prometheus metrics dashboard.

## Testing Backend Changes

To test changes made to the backend, use the following cURL commands to interact with the API:


- Creating a Pipeline:

```Bash
curl -X POST http://localhost:5001/pipelines \
-H "Content-Type: application/json" \
-d '{
    "name": "test_pipeline_json",
    "description": "Pipeline for testing JSON data",
    "source": "/app/sample_data/sample_data.json",
    "destination": "postgresql://postgres:mysecretpassword@db:5432/dataflow"
}'
```

- Retrieving All Pipelines:

```Bash
curl -X GET http://localhost:5001/pipelines
```

- Retrieving a Specific Pipelines:
  
```Bash
curl -X GET http://localhost:5001/pipelines/1
```

- Updating a Pipeline:

```Bash
curl -X PUT http://localhost:5001/pipelines/1 \
-H "Content-Type: application/json" \
-d '{
    "name": "updated_pipeline_json",
    "description": "Updated description",
    "source": "/app/sample_data/updated_data.json",
    "destination": "postgresql://postgres:mysecretpassword@db:5432/dataflow"
}'
```

- Deleting a Pipeline:

```Bash
curl -X DELETE http://localhost:5001/pipelines/1
```

- Running a Pipeline:

```Bash
curl -X POST http://localhost:5001/pipelines/run/1
```


## Links

-  Google Drive link to Demo video: https://drive.google.com/file/d/154UtyvkYV_h7kq92dFf2pZmthKKWvuXT/view 
