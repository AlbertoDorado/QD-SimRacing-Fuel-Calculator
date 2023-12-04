const DEFAULT_FUEL_PER_LAP = 2.0;
const DEFAULT_LAP_TIME = 120;
const DEFAULT_RACE_TIME = 20;
const MINIMAL_FUEL_PER_LAP = 0.1;
const MINIMAL_LAP_TIME = 1;
const MINIMAL_RACE_TIME = 1;
const FUELPERLAP_ID = "fpl";
const LAPTIME_ID = "laptime";
const RACETIME_ID = "racetime";

class Parameter {
    constructor(value, min) {
        this.value = value;
        this.min = min;
    }
}

let savedFpl = parseFloat(localStorage.getItem(FUELPERLAP_ID));
let savedLaptime = parseInt(localStorage.getItem(LAPTIME_ID));
let savedRacetime = parseInt(localStorage.getItem(RACETIME_ID));
let fuelPerLap = new Parameter(isNaN(savedFpl) ? DEFAULT_FUEL_PER_LAP : savedFpl, MINIMAL_FUEL_PER_LAP);
let lapTime = new Parameter(isNaN(savedLaptime) ? DEFAULT_LAP_TIME : savedLaptime, MINIMAL_LAP_TIME);
let raceTime = new Parameter(isNaN(savedRacetime) ? DEFAULT_RACE_TIME : savedRacetime, MINIMAL_RACE_TIME);

window.onload = function() {
    updateControls();
}

function updateParameter(parameter, qty) {
    parameter.value += qty;
    parameter.value < parameter.min ? parameter.value = parameter.min : parameter.value;
    updateControls();
}

function calculateTotalFuel() {
    return (calculateTotalLaps() * fuelPerLap.value).toFixed(1);
}

function calculateTotalLaps() {
    return Math.ceil((raceTime.value * 60) / lapTime.value);
}

function updateControls() {
    document.getElementById("fpl_value").innerHTML = fuelPerLap.value.toFixed(1);
    document.getElementById("lt_value").innerHTML = formatLapTime(lapTime.value);
    document.getElementById("rt_value").innerHTML = raceTime.value;
    document.getElementById("fuel_calculation").innerHTML = calculateTotalFuel();
    document.getElementById("laps_calculation").innerHTML = calculateTotalLaps();
    saveParams();
}

function formatLapTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, '0')}`;
}

function saveParams() {
    localStorage.setItem(FUELPERLAP_ID, fuelPerLap.value.toFixed(1));
    localStorage.setItem(LAPTIME_ID, lapTime.value);
    localStorage.setItem(RACETIME_ID, raceTime.value);
}

function reset() {
    fuelPerLap.value = DEFAULT_FUEL_PER_LAP;
    lapTime.value = DEFAULT_LAP_TIME;
    raceTime.value = DEFAULT_RACE_TIME;
    updateControls();
}
