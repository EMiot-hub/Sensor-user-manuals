<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>OSpir Sensor Downlink Message Encoder Manual</h1>
    
  <h2>Overview</h2>
  <p>This program is designed to encode various configuration settings into downlink messages for the <strong>OSpir</strong> sensor. These messages control key features of the sensor, such as heartbeat intervals, BLE scanner settings, PIR wait times, and other configurable settings. The encoded message is returned as a hexadecimal string and can be sent to the sensor for configuration.</p>

  <h2>Functionality</h2>
  <p>The encoder converts input settings into a byte array, which is then transformed into a hexadecimal string for downlink communication. These settings control various aspects of the OSpir sensor, including BLE scanning duration, PIR motion wait times, and factory resets.</p>

  <h2>Input Parameters</h2>
  <p>Below is a description of the input parameters used to configure the OSpir sensor:</p>

  <h3>Parameters and Allowed Values:</h3>
  <ul>
      <li><strong>Heartbeat Interval (<code>heatbeat_interval</code>)</strong>: Defines the heartbeat period in minutes. Allowed values:
          <pre>[30, 60, 120, 240, 360, 480, 600, 720]</pre>
      </li>
      <li><strong>Confirmed Heartbeat (<code>confirmed_heatbeat</code>)</strong>: Boolean flag indicating whether to send confirmed heartbeat messages:
          <pre>true  // Confirmed<br>false // Unconfirmed</pre>
      </li>
      <li><strong>BLE Scanner (<code>ble_scanner</code>)</strong>: Defines whether the BLE scanner is enabled or disabled:
          <pre>"on"  // Scanner enabled<br>"off" // Scanner disabled</pre>
      </li>
      <li><strong>PIR Wait Time (<code>pir_wait_time</code>)</strong>: Defines the amount of time the sensor waits for motion before triggering the next send(also know as Blocktime). Allowed values:
          <pre>[10, 15, 20, 30, 45, 60]  // in seconds</pre>
      </li>
      <li><strong>Auto BLE Prefixes (<code>ble_prefix_1</code>, <code>ble_prefix_2</code>, <code>ble_prefix_3</code>)</strong>: Custom BLE prefixes in hexadecimal format (6 characters). If not needed, leave the field empty:
          <pre>"AABBCC" // Example of a valid 6-character hex string<br>""       // Leave empty if not used</pre>
      </li>
      <li><strong>BLE Scan Time (<code>scan_time</code>)</strong>: The BLE scanning duration in seconds. Choose from the following values:
          <pre>1 // Short scan time<br>2 // Long scan time</pre>
      </li>
      <li><strong>Set Default Settings (<code>setDefaultSettings</code>)</strong>: When set, this resets the OSpir sensor to factory settings:
          <pre>"yes" // Reset sensor to factory settings<br>"no"  // Do not reset</pre>
      </li>
      <li><strong>Scan After First Trigger (<code>scan_after_first_trigger</code>)</strong>: Boolean flag that determines if the sensor scans again after the first PIR trigger (if false the sensor will not use power on ble scans on session triggers):
          <pre>flase  // Do not scan again after the first trigger<br>true // Continue scanning after the first trigger</pre>
      </li>
  </ul>

  <h2>Example Input Configuration</h2>
  <pre>
  var Input_config = {
      data: {
          heatbeat_interval: 120,        // Heartbeat interval (120 min)
          confirmed_heatbeat: true,      // Enable confirmed heartbeat messages
          ble_scanner: "on",             // BLE scanner is enabled
          ble_prefix_1: "ac233f",        // Custom BLE prefix 1
          ble_prefix_2: "",              // No BLE prefix 2
          ble_prefix_3: "",              // No BLE prefix 3
          scan_time: 1,                  // 1 sec BLE scan time
          pir_wait_time: 20,             // PIR wait time (20 seconds)
          scan_after_first_trigger: true, // Continue scanning after first trigger
          setDefaultSettings: ""         // Do not reset to factory settings
      }
  };
  </pre>

  <h2>Generating a Downlink Message</h2>
  <p>To encode the input configuration into a downlink message, run the encoder tool with the specified input data structure:</p>
  <pre>
  node .\encoder.js
  </pre>

  <h3>Output</h3>
  <p>The function will return an object with two key properties:</p>
  <ul>
      <li><strong><code>hexString</code></strong>: The encoded downlink message as a hexadecimal string.</li>
      <li><strong><code>fPort</code></strong>: The port number (10) on which the message should be sent.</li>
  </ul>

  <h3>Sample Output:</h3>
  <pre>
  { hexString: '0001010404040400FFFFFF01FF', fPort: 10 }
  </pre>

  <h2>Requirements for Running the Program</h2>
  <p>To run the OSpir downlink message encoder, ensure you have the following:</p>
  <ol>
    <li><strong>JavaScript Environment</strong>: The program is written in JavaScript and can run in any JavaScript environment, such as:
      <ul>
        <li><strong>Node.js</strong>: Install Node.js from <a href="https://nodejs.org" target="_blank">https://nodejs.org</a>.</li>
      </ul>
    </li>
    <li><strong>Input Data Structure</strong>: The input must follow the structure outlined in the <code>Input_config</code> object, with proper values for:
      <ul>
        <li>Heartbeat Interval</li>
        <li>Confirmed Heartbeat</li>
        <li>BLE Scanner</li>
        <li>Calibration Values for Forces</li>
        <li>Auto Calibration</li>
        <li>BLE Prefixes</li>
        <li>BLE Scan Time</li>
        <li>Set Default Settings</li>
        <li>Scan After First Trigger</li>
      </ul>
    </li>
    <li><strong>Hexadecimal String Output</strong>: The program outputs a downlink message in a hexadecimal string format, which can be used for communication with the OSpir sensor as a byte downlink.</li>
    <li><strong>fPort Setting</strong>: The output also includes an <code>fPort</code> value, which indicates the port number (typically 10) for sending the downlink message.</li>
  </ol>

  <h3>Software Dependencies</h3>
  <p>No external libraries or dependencies are required to run the program. It runs in any standard JavaScript environment.</p>
</body>
</html>