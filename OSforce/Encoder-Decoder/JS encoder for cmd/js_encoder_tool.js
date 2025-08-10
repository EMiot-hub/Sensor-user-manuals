// node js_encoder_tool.js
var otaaPeriods = [30, 60, 120, 240, 360, 480, 600, 720];
var confirmedHeatbeat = [false, true];
var bleScanner = ["off", "on"];
var calValues = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
var check_int_val = [4,5,7,8,10,12];
var scanTimeOptions = [1, 2];
var setDefaultSettings = ["yes"];
var auto_calibration = ["yes"];



function encodeDownlink(input) {
    var bytes = [];

    // Convert OTAA period to index
    var otaaPeriodIndex = otaaPeriods.indexOf(input.data.otaaPeriods);
    bytes.push(otaaPeriodIndex >= 0 ? otaaPeriodIndex : 255);

    // Convert confirmed heatbeat to index (boolean -> 0/1)
    var confirmedHeatbeatIndex = confirmedHeatbeat.indexOf(input.data.confirmedHeatbeat);
    bytes.push(confirmedHeatbeatIndex >= 0 ? confirmedHeatbeatIndex : 255);

    // Convert BLE scanner on/off to index
    var bleScannerIndex = bleScanner.indexOf(input.data.bleScanner);
    bytes.push(bleScannerIndex >= 0 ? bleScannerIndex : 255);

    // Convert calibration values for force 1 to 4
    bytes.push(calValues.indexOf(input.data.cal_value_force_1) >= 0 ? calValues.indexOf(input.data.cal_value_force_1) : 255);
    bytes.push(calValues.indexOf(input.data.cal_value_force_2) >= 0 ? calValues.indexOf(input.data.cal_value_force_2) : 255);

    // check_int is used to set the time interval between force measurements
    bytes.push(check_int_val.indexOf(input.data.check_int) >= 0 ? check_int_val.indexOf(input.data.check_int) : 255);

    //
    bytes.push(255);


    bytes.push(auto_calibration.indexOf(input.data.auto_calibration) >= 0 ? auto_calibration.indexOf(input.data.auto_calibration) : 255);

    // Handle custom BLE Prefix indicators for 1,2,3
    if (input.data.blePrefix1 && input.data.blePrefix1.length === 6) {
        bytes.push(4);  // Custom prefix marker (04)
    } else {
        bytes.push(255);  // Default marker if no valid prefix
    }
    if (input.data.blePrefix2 && input.data.blePrefix2.length === 6) {
        bytes.push(4);  
    } else {
        bytes.push(255);
    }
    if (input.data.blePrefix3 && input.data.blePrefix3.length === 6) {
        bytes.push(4);  
    } else {
        bytes.push(255);
    }

    // Convert default settings
    var setDefaultSettingsIndex = setDefaultSettings.indexOf(input.data.setDefaultSettings);
    bytes.push(setDefaultSettingsIndex >= 0 ? setDefaultSettingsIndex + 1 : 255);

    // Convert BLE scan time
    var scanTimeIndex = scanTimeOptions.indexOf(input.data.bleScanTime);
    bytes.push(scanTimeIndex >= 0 ? scanTimeIndex : 255);


    // Handle custom BLE Prefix 1, 2, and 3
    if (input.data.blePrefix1 && input.data.blePrefix1.length === 6) {
        for (var i = 0; i < input.data.blePrefix1.length; i += 2) {
            bytes.push(parseInt(input.data.blePrefix1.substr(i, 2), 16));
        }
    }
    if (input.data.blePrefix2 && input.data.blePrefix2.length === 6) {
        for (var j = 0; j < input.data.blePrefix2.length; j += 2) {
            bytes.push(parseInt(input.data.blePrefix2.substr(j, 2), 16));
        }
    }
    if (input.data.blePrefix3 && input.data.blePrefix3.length === 6) {
        for (var k = 0; k < input.data.blePrefix3.length; k += 2) {
            bytes.push(parseInt(input.data.blePrefix3.substr(k, 2), 16));
        }
    }

    // Convert byte array to hex string
    var hexString = bytes.map(function(byte) {
        return ("0" + byte.toString(16)).slice(-2);  // Ensures two-digit hex values
    }).join("");

    return {
        hexString: hexString.toUpperCase(),
        fPort: 10
    };
}

// Input data
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

// Run the encoding function
var result = encodeDownlink(Input_config);
console.log(result);
