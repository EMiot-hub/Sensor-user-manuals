<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>OsForce Sensor Downlink Message Encoder Manual</h1>
    
<h2>Overview</h2>
    <p>This program is designed to encode various configuration settings into downlink messages for the <strong>OsForce</strong> sensor. These messages control key features of the sensor, such as OTAA periods, BLE scanner settings, and calibration values. The encoded message is returned as a hexadecimal string and can be sent to the sensor for configuration.</p>
    
  <h2>Functionality</h2>
    <p>The encoder converts input settings into a byte array, which is then transformed into a hexadecimal string for downlink communication. These settings control various aspects of the OsForce sensor, including its BLE scanning duration, calibration options, and factory resets.</p>

  <h2>Input Parameters</h2>
    <p>Below is a description of the input parameters used to configure the OsForce sensor:</p>

  <h3>Parameters and Allowed Values:</h3>
    <ul>
        <li><strong>OTAA Period (<code>otaaPeriods</code>)</strong>: Defines the heartbeat period in minutes. Allowed values:
            <pre>[30, 60, 120, 240, 360, 480, 600, 720]</pre>
        </li>
        <li><strong>Confirmed Heartbeat (<code>confirmedHeatbeat</code>)</strong>: Boolean flag indicating whether to send confirmed heartbeat messages:
            <pre>true  // Confirmed<br>false // Unconfirmed</pre>
        </li>
        <li><strong>BLE Scanner (<code>bleScanner</code>)</strong>: Defines whether the BLE scanner is enabled or disabled:
            <pre>"on"  // Scanner enabled<br>"off" // Scanner disabled</pre>
        </li>
        <li><strong>Calibration Values for Forces (<code>cal_value_force_1</code>, <code>cal_value_force_2</code>, <code>cal_value_force_3</code>, <code>cal_value_force_4</code>)</strong>: Defines the calibration values for four different forces. Allowed values:
            <pre>[-100, -75, -50, -25, 0, 25, 50, 75, 100]</pre>
        </li>
        <li><strong>Check_int (<code>Check_int</code>)</strong>: Defines the interval between mesurment. Allowed values:
            <pre>[4, 5, 7, 8, 10, 12]</pre>
        </li>
        <li><strong>Auto Calibration (<code>auto_calibration</code>)</strong>: When set, this triggers an immediate calibration of the sensor when the message is received:
            <pre>"yes" // Trigger auto-calibration<br>""    // Leave empty if not triggering calibration</pre>
        </li>
        <li><strong>BLE Prefixes (<code>blePrefix1</code>, <code>blePrefix2</code>, <code>blePrefix3</code>)</strong>: Custom BLE prefixes in 6-character hexadecimal format. If not needed, leave the field empty:
            <pre>"AABBCC" // Example of a valid 6-character hex string<br>""       // Leave empty if not used</pre>
        </li>
        <li><strong>BLE Scan Time (<code>bleScanTime</code>)</strong>: The BLE scanning duration in seconds. Choose from the following values:
            <pre>1 // Short scan time<br>2 // Long scan time</pre>
        </li>
        <li><strong>Set Default Settings (<code>setDefaultSettings</code>)</strong>: When set, this resets the OsForce sensor to factory settings:
            <pre>"yes" // Reset sensor to factory settings<br>""    // Leave empty if not resetting</pre>
        </li>
    </ul>

  <h2>Example Input Configuration</h2>
    <pre>
var Input_config = {
    data: {
        otaaPeriods: 30,               // Selected OTAA period (30 seconds)
        confirmedHeatbeat: true,        // Enable confirmed heartbeat messages
        bleScanner: "off",               // BLE scanner is enabled
        cal_value_force_1: 0,           // Calibration value for force 1
        cal_value_force_2: 0,           // Calibration value for force 2
        check_int: 10,                  // Time interval between force measurements (in seconds - only 4,5,7,8,10,12 are valid)
        auto_calibration: "yes",        // Trigger auto-calibration when received
        blePrefix1: "",                 // No custom BLE prefix for this example
        blePrefix2: "",                 // No custom BLE prefix for this example
        blePrefix3: "",                 // No custom BLE prefix for this example
        bleScanTime: 2,                 // BLE scan time (long scan time, in seconds)
        setDefaultSettings: ""          // Not resetting to factory settings
    }
};

    </pre>

  <h2>Generating a Downlink Message</h2>
    <p>To encode the input configuration into a downlink message, run the following command in the dir you have the encoder downloaded in:</p>
    <pre>
node .\js_encoder_tool.js
    </pre>

  <h3>Output</h3>
    <p>The function will return an object with two key properties:</p>
    <ul>
        <li><strong><code>hexString</code></strong>: The encoded downlink message as a hexadecimal string.</li>
        <li><strong><code>fPort</code></strong>: The port number (10) on which the message should be sent.</li>
    </ul>

  <h3>Sample Output:</h3>
    <pre>
    { hexString: '000100040404FF00FFFFFFFF01', fPort: 10 }
    </pre>
<h2>Requirements for Running the Program</h2>

<p>To run the OsForce downlink message encoder, ensure you have the following:</p>

<ol>
  <li>
    <strong>JavaScript Environment</strong>: The program is written in JavaScript and can run in any JavaScript environment, such as:
    <ul>
      <li><strong>Node.js</strong>: Install Node.js from <a href="https://nodejs.org" target="_blank">https://nodejs.org</a>.</li>
    </ul>
  </li>

  <li>
    <strong>Input Data Structure</strong>: The input must follow the structure outlined in the <code>Input_config</code> object, with proper values for:
    <ul>
      <li>OTAA Periods</li>
      <li>Confirmed Heartbeat</li>
      <li>BLE Scanner</li>
      <li>Calibration Values for Forces</li>
      <li>Mesurement check interval</li>
      <li>Auto Calibration</li>
      <li>BLE Prefixes - and if set please set prefix 1 first then 2 and 3</li>
      <li>BLE Scan Time</li>
      <li>Set Default Settings</li>
    </ul>
  </li>

  <li>
    <strong>Hexadecimal String Output</strong>: The program outputs a downlink message in a hexadecimal string format, which can be used for communication with the OsForce sensor as a byte downlink.
  </li>

  <li>
    <strong>fPort Setting</strong>: The output also includes an <code>fPort</code> value, which indicates the port number (typically 10) for sending the downlink message.
  </li>
</ol>

<h3>Software Dependencies</h3>

<p>No external libraries or dependencies are required to run the program. It runs in any standard JavaScript environment.</p>


 </body>
</html>
