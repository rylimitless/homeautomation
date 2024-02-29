#! /usr/bin/env python
from app import app, Config, Mqtt



if __name__ == "__main__":   

    # START MQTT CLIENT 
    Mqtt.client.loop_start()

    # RUN FLASK APP
    app.run(host='10.22.16.114', port=8080)