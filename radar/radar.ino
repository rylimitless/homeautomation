#include <Arduino.h>
#include <NewPing.h>


#define TRIG 2 // Trigger pin
#define ECHO  3 

NewPing sonar(TRIG, ECHO,200); // NewPing setup of pins and maximum distance.

void setup() {
  
  Serial.begin(9600);
}

void loop() {
  // Serial.println("Hello, world!");
  double radar = sonar.ping_in();
  Serial.println(radar);
  delay(1000);
}
