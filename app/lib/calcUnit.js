function convertSpeed(unit, data) {
  if (unit === 'imperial') {
    return data * 0.44704; // Convert mph to m/s
  } else if (unit === 'metric') {
    return data / 0.44704; // Convert m/s to mph
  } else {
    throw new Error(
      "Invalid unit. Use 'mph' for miles per hour or 'mps' for meters per second.",
    );
  }
}

function convertTemperature(unit, data) {
  if (unit === 'F') {
    return ((data - 32) * 5) / 9; // Convert Fahrenheit to Celsius
  } else if (unit === 'C') {
    return (data * 9) / 5 + 32; // Convert Celsius to Fahrenheit
  } else {
    throw new Error("Invalid unit. Use 'F' for Fahrenheit or 'C' for Celsius.");
  }
}

// Example usage:
console.log(convertTemperature(32, 'F')); // 0°C
console.log(convertTemperature(100, 'C')); // 212°F

// Example usage:
console.log(convertSpeed(60, 'mph')); // 26.8224 (m/s)
console.log(convertSpeed(30, 'mps')); // 67.108 (mph)
