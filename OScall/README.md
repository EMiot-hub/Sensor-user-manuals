<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>OsCall Documentation</h1>

<h2>Overview</h2>
<p>OsCall is a LoRaWAN button designed to be comfortably worn on the wrist. The button features a built-in BLE scanner that reports surrounding BLE MAC addresses and RSSI over LoRaWAN when the button is pressed.</p>

<h2>Default Settings</h2>
<table>
    <tr>
        <th>Setting</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>Heartbeat Interval</td>
        <td>120 MIN</td>
    </tr>
    <tr>
        <td>BLE Scanner</td>
        <td>OFF</td>
    </tr>
    <tr>
        <td>Confirmed Heartbeat</td>
        <td>ON</td>
    </tr>
    <tr>
        <td>BLE Prefix 1</td>
        <td>NOT SET</td>
    </tr>
    <tr>
        <td>BLE Prefix 2</td>
        <td>NOT SET</td>
    </tr>
    <tr>
        <td>BLE Prefix 3</td>
        <td>NOT SET</td>
    </tr>
    <tr>
        <td>BLE Scan Time</td>
        <td>1 SEC</td>
    </tr>
</table>

<h2>Decoded Payload</h2>
<p>OsCall delivers data over fport 1 and 2.</p>

<h3>Fport 1</h3>
<p><strong>Heartbeats</strong>: Contains <code>reason</code> and <code>voltage</code>.</p>
<ul>
    <li><code>reason</code>: Always <code>reason = 0</code> for heartbeats.</li>
    <li><code>voltage</code>: Battery voltage in volts.</li>
</ul>
<p><strong>Example of fport 1 payload:</strong></p>
<pre>
<code>{
  "uplink_message": {
    "session_key_id": "AYsQ4d1KVXOoFH3E4cA3Xg==",
    "f_port": 1,
    "f_cnt": 1,
    "frm_payload": "AB0=",
    "decoded_payload": {
      "reason": 0,
      "voltage": 2.9
    }
  }
}
</code>
</pre>

<h3>Fport 2</h3>
<p><strong>Button Press</strong>: Sends <code>voltage</code>, <code>reason</code>, <code>mac</code>, and <code>rssi</code>.</p>
<ul>
    <li><code>reason</code>: <code>1</code> for button press.</li>
    <li><code>mac</code> and <code>rssi</code>: Results of the BLE scan.</li>
</ul>
<p><strong>Example of fport 2 payload:</strong></p>
<pre>
<code>{
  "uplink_message": {
    "session_key_id": "AYsQ4d1KVXOoFH3E4cA3Xg==",
    "f_port": 2,
    "f_cnt": 2,
    "frm_payload": "Af8AAWcAN2E4MzBlZmViMGVhfC01MnxhYzIzM2ZmNmNkOGR8LTc3fDU3NjJlYmRhOGY2YXwtODR8ODQyYWZkZTdhNDExfC02NnxhYzIzM2ZmYWRjMjZ8LTY3fGFjMjMzZmZhZGMyN3wtNzB8pQ==",
    "decoded_payload": {
      "voltage": 3.2,
      "mac": [
        "7a830efeb0ea",
        "ac233ff6cd8d",
        "5762ebda8f6a",
        "842afde7a411",
        "ac233ffadc26",
        "ac233ffadc27"
      ],
      "reason": 1,
      "rssi": [
        -52,
        -77,
        -84,
        -66,
        -67,
        -70
      ]
    }
  }
}
</code>
</pre>

<h2>Creating a Decoder</h2>

<h3>Fport 1</h3>
<p>Heartbeats sent with fport 1 contain one byte representing the battery level multiplied by 10. To get the voltage, divide the value by 10.</p>

<h3>Fport 2</h3>
<p>Button press sends a long byte string. The first byte is the battery level multiplied by 10. The rest is a long byte string to be decoded as described.</p>

<h2>Downlink OTA Configuration</h2>
<p>Using the provided encoder, you can configure OsCall with a JSON file.</p>

<h3>Example JSON Configuration:</h3>
<pre>
<code>{
  "heartbeat_interval": 240,
  "confirmed_heartbeat": true,
  "ble_scanner": "on",
  "ble_prefix_1": "",
  "ble_prefix_2": "",
  "ble_prefix_3": "",
  "scan_time": 1
}
</code>
</pre>

<h3>Factory Reset JSON Configuration:</h3>
<pre>
<code>{
  "factory_reset": "yes"
}
</code>
</pre>

<h2>Manual Byte String Creation for Downlink OTA Configuration</h2>

<h3>Heartbeat Interval:</h3>
<table>
    <tr>
        <th>fport</th>
        <th>Heartbeat Interval (min)</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>30</td>
        <td>00 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>60</td>
        <td>01 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>120</td>
        <td>02 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>240</td>
        <td>03 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>360</td>
        <td>04 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>480</td>
        <td>05 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>600</td>
        <td>06 ff ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>720</td>
        <td>07 ff ff ff ff ff ff</td>
    </tr>
</table>

<h3>Confirmed Heartbeat:</h3>
<table>
    <tr>
        <th>fport</th>
        <th>Confirmed Heartbeat</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>False</td>
        <td>ff 00 ff ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>True</td>
        <td>ff 01 ff ff ff ff ff</td>
    </tr>
</table>

<h3>BLE Scanner:</h3>
<table>
    <tr>
        <th>fport</th>
        <th>BLE Scanner</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>on</td>
        <td>ff ff 00 ff ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>off</td>
        <td>ff ff 01 ff ff ff ff</td>
    </tr>
</table>

<h3>BLE Prefix 1:</h3>
<p>For setting BLE prefix 1, the index of the desired BLE manufacturer’s MAC address is sent in the 4th byte. For "Minew" BLE beacons, send 00 in the 4th byte.</p>
<p>List of approved BLE manufacturer MAC addresses: <code>["ac233f","oc0001","oc0002","oc0003"]</code></p>
<table>
    <tr>
        <th>fport</th>
        <th>BLE Prefix 1</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>"ac233f"</td>
        <td>ff ff ff 00 ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>"oc0001"</td>
        <td>ff ff ff 01 ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>"oc0002"</td>
        <td>ff ff ff 02 ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>...</td>
        <td>ff ff ff xx ff ff ff</td>
    </tr>
    <tr>
        <td>10</td>
        <td>off</td>
        <td>ff ff ff ff ff ff ff</td>
    </tr>
</table>

<h3>Factory Resetting OTA:</h3>
<p>To factory reset OsCall OTA, send "00" to bit 7. This will return OsCall to default settings as described in "Default Settings".</p>
<table>
    <tr>
        <th>fport</th>
        <th>Factory Reset</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>Yes</td>
        <td>ff ff ff ff ff ff 00 ff</td>
    </tr>
</table>

<h3>Scan Time OTA:</h3>
<p>Scan time is set in byte 8 and can be set to 1 or 2 seconds.</p>
<table>
    <tr>
        <th>fport</th>
        <th>Scan Time</th>
        <th>Sent Byte</th>
    </tr>
    <tr>
        <td>10</td>
        <td>2</td>
        <td>ff ff ff ff ff ff ff 01</td>
    </tr>
</table>

<h2>Decoder/Encoder</h2>
<p>In the "De/Encoders" folder, you can find the decoder for different networks like TTN (The Things Network). It is a JavaScript decoder that can convert the raw byte string into the format described above.</p>

<h2>Reset/Rejoin OsCall</h2>
<p>To reset OsCall, hold the button for 20 seconds until 4 blinks are seen. This will cause OsCall to re-join the network. Use this function if you wish to switch networks or reset the configuration.</p>
<p>Holding the button for 40 seconds or more will reset OsCall to factory settings, indicated by 4 long blinks.</p>

<h2>Battery Replacement</h2>
<p>The button casing is sealed and waterproof (IP65), and the battery cannot be replaced without special tools. Therefore, OsCall comes with a refurbished agreement.</p>

<h2>Debugging</h2>
<table>
    <tr>
        <th>Blink Type</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>Long Blink</td>
        <td>Normal button press when OsCall is on a LoRaWAN network.</td>
    </tr>
    <tr>
        <td>2 Blinks</td>
        <td>OsCall is not joined to a network and tries every 12 hours or after a restart.</td>
    </tr>
    <tr>
        <td>4 Blinks</td>
        <td>OsCall is restarting.</td>
    </tr>
    <tr>
        <td>4 Long Blinks</td>
        <td>OsCall is factory resetting.</td>
    </tr>
</table>

<h2>Contact</h2>
<p>For further questions, contact <a href="mailto:oscar@emiot.dk">oscar@emiot.dk</a> or call +45 25798300.</p>

</body>
</html>
