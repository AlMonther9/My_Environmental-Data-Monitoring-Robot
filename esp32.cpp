#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "your-SSID";
const char* password = "your-PASSWORD";
const char* serverName = "http://your-server-ip:3001/data";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverName);
        http.addHeader("Content-Type", "application/json");

        StaticJsonDocument<200> jsonDoc;
        jsonDoc["temperature"] = readTemperature();
        jsonDoc["humidity"] = readHumidity();
        jsonDoc["gas"] = readGas();
        jsonDoc["co2"] = readCO2();
        jsonDoc["gps"] = readGPS();
        jsonDoc["ultrasonic"] = readUltrasonic();
        jsonDoc["camera"] = captureImage();  // Assuming it returns a base64 string

        String requestBody;
        serializeJson(jsonDoc, requestBody);

        int httpResponseCode = http.POST(requestBody);
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        } else {
            Serial.println("Error on sending POST");
        }
        http.end();
    }
    delay(60000); // Send data every 60 seconds
}

float readTemperature() {
    // Implement temperature reading
    return 25.0;
}

float readHumidity() {
    // Implement humidity reading
    return 50.0;
}

float readGas() {
    // Implement gas reading
    return 400.0;
}

float readCO2() {
    // Implement CO2 reading
    return 600.0;
}

String readGPS() {
    // Implement GPS reading
    return "51.5074, -0.1278";
}

float readUltrasonic() {
    // Implement ultrasonic distance reading
    return 100.0;
}

String captureImage() {
    // Implement camera capture and return base64 string
    return "base64encodedimage";
}
