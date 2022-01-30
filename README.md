# Fullstack-weather-data.
This project was created over course in 2021 spring. Projects idea was to make fullstack system with REST API and database to record data from self created IoT -system. Such system read sensordata at school, sent it to MQTT server via LAN. MQTT server relayed it to the REST API server which ran on virtual machine.

## Specs
- **Docker driven environment**.
  For reliability in system environments; backend, frontend and SQL server were packed in docker containers.

- **CI/CD pipeline**. 
  this project was originally based on school Gitlab and pipeline was connected to schools virtual machine. Nodemon was installed for automation of production and for releasing new version to pipeline.

- **Node.js**.
  Javascript driven REST API was chosen by teacher for simplicity. Path driven end points.

- **MySql**.
  Database platform was used for securing the data from MQTT server.
