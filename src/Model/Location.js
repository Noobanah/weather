class Location {
    constructor(name, latitude, longitude, weather = null) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.weather = weather;
    }

    updateWeather(newWeather) {
        this.weather = newWeather;
    }

    // getInfo() {
    //     return `Location: ${this.name}, Lat: ${this.latitude}, Long: ${this.longitude}, Temp: ${this.temperature}°C`;
    // }
}

// Export the class for use in other files
export default Location;