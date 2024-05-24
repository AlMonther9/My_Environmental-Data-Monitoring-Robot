import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const socket = io('http://localhost:3001');
const serverName = 'http://192.168.1.93:3001/data';

function sendData(data) {
  fetch(serverName, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data sent:', data);
  })
  .catch(error => {
    console.error('Error sending data:', error);
  });
}

// Example data object
const data = {
  temperature: 25.0,
  humidity: 50.0,
  gas: 400.0,
  co2: 600.0,
  gps: '51.5074, -0.1278',
  ultrasonic: 100.0,
  camera: 'base64encodedimage'
};

// Call sendData with your data
sendData(data);

function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        socket.on('sensorData', (sensorData) => {
            setData(sensorData);
        });
    }, []);

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2">Environmental Data Monitor</Typography>
                </Grid>
                {data && (
                    <>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Temperature: {data.temperature}°C</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Humidity: {data.humidity}%</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Gas: {data.gas} PPM</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">CO2: {data.co2} PPM</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">GPS: {data.gps}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Distance: {data.ultrasonic} cm</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Camera Feed</Typography>
                                    <img src={`data:image/jpeg;base64,${data.camera}`} alt="Camera" style={{ width: '100%' }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default App;
