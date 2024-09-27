var otaaPeriods = [30, 60, 120, 240, 360, 480, 600, 720];
var confirmedHeatbeat = [false, true];
var bleScanner = ["off", "on"];
var calValues = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
var scanTimeOptions = [1, 2];
var setDefaultSettings = ["yes"];
var auto_calibration = ["yes"];



function encodeDownlink(input) {
    var bytes = [];

    // Convert OTAA period to index
    var otaaPeriodIndex = otaaPeriods.indexOf(input.data.otaaPeriods);
    bytes.push(otaaPeriodIndex >= 0 ? otaaPeriodIndex : 255);  // Default to index 0 if not found

    // Convert confirmed heatbeat to index (boolean -> 0/1)
    var confirmedHeatbeatIndex = confirmedHeatbeat.indexOf(input.data.confirmedHeatbeat);
    bytes.push(confirmedHeatbeatIndex >= 0 ? confirmedHeatbeatIndex : 255);

    // Convert BLE scanner on/off to index
    var bleScannerIndex = bleScanner.indexOf(input.data.bleScanner);
    bytes.push(bleScannerIndex >= 0 ? bleScannerIndex : 255);

    // Convert calibration values for force 1 to 4
    bytes.push(calValues.indexOf(input.data.cal_value_force_1));
    bytes.push(calValues.indexOf(input.data.cal_value_force_2));
    bytes.push(calValues.indexOf(input.data.cal_value_force_3));
    bytes.push(calValues.indexOf(input.data.cal_value_force_4));

    bytes.push(auto_calibration.indexOf(input.data.auto_calibration));

    // Handle custom BLE Prefix indicators for 1,2,3
    if (input.data.blePrefix1 && input.data.blePrefix1.length === 6) {
        bytes.push(4);  // Custom prefix marker (04)
    }else {
      bytes.push(255);  // Custom prefix marker (04)
    }
    if (input.data.blePrefix2 && input.data.blePrefix2.length === 6) {
        bytes.push(4);  // Custom prefix marker (04)
    }else {
      bytes.push(255);  // Custom prefix marker (04)
    }
    if (input.data.blePrefix3 && input.data.blePrefix3.length === 6) {
        bytes.push(4);  // Custom prefix marker (04)
    }else {
      bytes.push(255);  // Custom prefix marker (04)
    }

    // Convert BLE scan time
    var scanTimeIndex = scanTimeOptions.indexOf(input.data.bleScanTime);
    bytes.push(scanTimeIndex >= 0 ? scanTimeIndex : 255);


    // Convert BLE scan time
    var setDefaultSettingsIndex = setDefaultSettings.indexOf(input.data.setDefaultSettings);
    bytes.push(setDefaultSettingsIndex >= 0 ? setDefaultSettingsIndex : 255);

    // Handle custom BLE Prefix 1
    if (input.data.blePrefix1 && input.data.blePrefix1.length === 6) {
        for (var i = 0; i < input.data.blePrefix1.length; i += 2) {
            bytes.push(parseInt(input.data.blePrefix1.substr(i, 2), 16));  // Convert hex string to byte array
        }
    }

    // Handle custom BLE Prefix 2
    if (input.data.blePrefix2 && input.data.blePrefix2.length === 6) {
        for (var j = 0; j < input.data.blePrefix2.length; j += 2) {
            bytes.push(parseInt(input.data.blePrefix2.substr(j, 2), 16));  // Convert hex string to byte array
        }
    }

    // Handle custom BLE Prefix 3
    if (input.data.blePrefix3 && input.data.blePrefix3.length === 6) {
        for (var k = 0; k < input.data.blePrefix3.length; k += 2) {
            bytes.push(parseInt(input.data.blePrefix3.substr(k, 2), 16));  // Convert hex string to byte array
        }
    }



    return {
        bytes: bytes,
        fPort: 10  // Set the fPort for downlink
    };
}
