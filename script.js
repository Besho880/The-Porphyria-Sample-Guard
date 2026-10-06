// ========================================
// The Porphyria Sample Guard

 JAVASCRIPT
// ========================================

let sensorData = {
    temperature: 22.4,
    light: 6,
    transportTime: 32
};

let trackingInterval;


// ========================================
// PAGE NAVIGATION
// ========================================

function showPage(pageName, button) {

    document.querySelectorAll(".page").forEach(function (page) {
        page.classList.add("hidden");
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.remove("hidden");
        page.classList.add("active");
    }

    document.querySelectorAll(".nav-btn").forEach(function (btn) {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}


// ========================================
// CALCULATE AI RISK
// ========================================

function calculateRisk() {

    let risk = 0;
    let factors = [];

    // Temperature
    if (sensorData.temperature >= 27) {
        risk += 45;
        factors.push("High temperature");
    }
    else if (sensorData.temperature >= 24) {
        risk += 25;
        factors.push("Elevated temperature");
    }

    // Light
    if (sensorData.light >= 50) {
        risk += 30;
        factors.push("High light exposure");
    }
    else if (sensorData.light >= 20) {
        risk += 15;
        factors.push("Increased light exposure");
    }

    // Transport time
    if (sensorData.transportTime >= 60) {
        risk += 25;
        factors.push("Long transport time");
    }
    else if (sensorData.transportTime >= 40) {
        risk += 10;
        factors.push("Extended transport time");
    }

    risk = Math.min(risk, 100);

    let level = "Low Risk";

    if (risk >= 70) {
        level = "High Risk";
    }
    else if (risk >= 35) {
        level = "Warning";
    }

    let mainFactor = "Normal Conditions";

    if (sensorData.temperature >= 27) {
        mainFactor = "Temperature";
    }
    else if (sensorData.light >= 50) {
        mainFactor = "Light Level";
    }
    else if (sensorData.transportTime >= 60) {
        mainFactor = "Transport Time";
    }
    else if (factors.length > 0) {
        mainFactor = factors[0];
    }

    let pattern = "No unusual pattern detected";

    if (sensorData.temperature >= 27) {
        pattern = "High temperature detected";
    }
    else if (sensorData.light >= 50) {
        pattern = "High light exposure detected";
    }
    else if (sensorData.transportTime >= 60) {
        pattern = "Transport time is longer than expected";
    }
    else if (factors.length > 0) {
        pattern = "Some changes were detected in the transport data";
    }

    return {
        risk: risk,
        level: level,
        mainFactor: mainFactor,
        pattern: pattern,
        factors: factors
    };
}


// ========================================
// RUN AI ANALYSIS
// ========================================

function runAI() {

    console.log("AI Analysis Started");

    const result = calculateRisk();

    console.log("AI Result:", result);


    // Dashboard Risk Score
    const riskScore = document.getElementById("riskScore");

    if (riskScore) {
        riskScore.textContent = result.risk + "%";
    }


    // AI Risk Score
    const aiScore = document.getElementById("aiScore");

    if (aiScore) {
        aiScore.textContent = result.risk + "%";
    }


    // AI Level
    const aiLevel = document.getElementById("aiLevel");

    if (aiLevel) {
        aiLevel.textContent = result.level;
    }


    // Main Factor
    const mainFactor = document.getElementById("mainFactor");

    if (mainFactor) {
        mainFactor.textContent = result.mainFactor;
    }


    // Pattern
    const pattern = document.getElementById("pattern");

    if (pattern) {
        pattern.textContent = result.pattern;
    }


    // AI Summary
    const aiSummary = document.getElementById("aiSummary");

    if (aiSummary) {

        if (result.risk >= 70) {

            aiSummary.textContent =
                "The AI detected multiple risk factors that may affect the sample.";

        }
        else if (result.risk >= 35) {

            aiSummary.textContent =
                "The AI detected some unusual changes in the transport conditions.";

        }
        else {

            aiSummary.textContent =
                "The AI found no major problems with the current transport conditions.";
        }
    }


    // Recommendation
    const recommendation =
        document.getElementById("recommendation");

    if (recommendation) {

        if (result.risk >= 70) {

            recommendation.textContent =
                "Immediate attention is recommended. Check the sample conditions.";

        }
        else if (result.risk >= 35) {

            recommendation.textContent =
                "Monitor the sample closely and check the transport conditions.";

        }
        else {

            recommendation.textContent =
                "Continue monitoring the sample. Conditions are stable.";
        }
    }


    // Update dashboard status
    updateSampleStatus(result);

    console.log("AI Analysis Completed");
}


// ========================================
// UPDATE SAMPLE STATUS
// ========================================

function updateSampleStatus(result) {

    const status =
        document.getElementById("sampleStatus");

    const message =
        document.getElementById("statusMessage");

    if (status) {
        status.textContent = result.level.toUpperCase();
    }

    if (message) {

        if (result.risk >= 70) {

            message.textContent =
                "Immediate attention is required.";

        }
        else if (result.risk >= 35) {

            message.textContent =
                "Some unusual conditions were detected.";

        }
        else {

            message.textContent =
                "No major problems detected.";
        }
    }
}


// ========================================
// REFRESH SENSOR DATA
// ========================================

function refreshData() {

    sensorData.temperature =
        Number((20 + Math.random() * 9).toFixed(1));

    sensorData.light =
        Math.floor(5 + Math.random() * 65);

    sensorData.transportTime =
        Math.floor(20 + Math.random() * 70);


    const temperature =
        document.getElementById("temperature");

    if (temperature) {
        temperature.textContent =
            sensorData.temperature.toFixed(1) + "°C";
    }


    const light =
        document.getElementById("light");

    if (light) {
        light.textContent =
            sensorData.light + " lux";
    }


    const time =
        document.getElementById("transportTime");

    if (time) {

        const hours =
            Math.floor(sensorData.transportTime / 60);

        const minutes =
            sensorData.transportTime % 60;

        time.textContent =
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0");
    }


    runAI();
}


// ========================================
// SENSOR DETAILS
// ========================================

function openSensor(sensor) {

    const modal =
        document.getElementById("modal");

    const modalContent =
        document.getElementById("modalContent");

    if (!modal || !modalContent) {
        return;
    }

    let title = "";
    let icon = "";
    let description = "";

    if (sensor === "temperature") {

        title = "Temperature Sensor";
        icon = "🌡️";

        description =
            "<strong>Current Temperature:</strong> " +
            sensorData.temperature.toFixed(1) +
            "°C<br><br>" +
            "The temperature sensor monitors the sample conditions during transportation.";
    }

    else if (sensor === "light") {

        title = "Light Sensor";
        icon = "☀️";

        description =
            "<strong>Current Light Level:</strong> " +
            sensorData.light +
            " lux<br><br>" +
            "The light sensor helps detect unexpected light exposure inside the transport box.";
    }

    else if (sensor === "time") {

        title = "Transport Time";
        icon = "⏱️";

        description =
            "<strong>Transport Time:</strong> " +
            sensorData.transportTime +
            " minutes<br><br>" +
            "The system monitors how long the sample has been transported.";
    }

    modalContent.innerHTML = `
        <div class="sensor-modal">
            <div style="font-size:45px; margin-bottom:15px;">
                ${icon}
            </div>

            <h2>${title}</h2>

            <p>${description}</p>
        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("show");
}


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    const modal =
        document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hidden");
    }
}


// ========================================
// HISTORY REPORT
// ========================================

function viewReport(trip) {

    const modal =
        document.getElementById("modal");

    const modalContent =
        document.getElementById("modalContent");

    if (!modal || !modalContent) {
        return;
    }

    let report = "";

    if (trip === "PG-001") {

        report = `
            <h2>Trip Report - PG-001</h2>

            <div class="report-info">
                <p><strong>Status:</strong> Safe</p>
                <p><strong>Temperature:</strong> 22.4°C</p>
                <p><strong>Light:</strong> 6 lux</p>
                <p><strong>Transport Time:</strong> 32 minutes</p>
                <p><strong>AI Risk Score:</strong> 18%</p>
            </div>

            <p>
                AI Summary: The sample was transported
                under stable conditions.
            </p>
        `;
    }

    else if (trip === "PG-002") {

        report = `
            <h2>Trip Report - PG-002</h2>

            <div class="report-info">
                <p><strong>Status:</strong> Warning</p>
                <p><strong>Temperature:</strong> 24.8°C</p>
                <p><strong>Light:</strong> 22 lux</p>
                <p><strong>Transport Time:</strong> 46 minutes</p>
                <p><strong>AI Risk Score:</strong> 46%</p>
            </div>

            <p>
                AI Summary: Some unusual transport
                conditions were detected.
            </p>
        `;
    }

    else if (trip === "PG-003") {

        report = `
            <h2>Trip Report - PG-003</h2>

            <div class="report-info">
                <p><strong>Status:</strong> High Risk</p>
                <p><strong>Temperature:</strong> 27.1°C</p>
                <p><strong>Light:</strong> 61 lux</p>
                <p><strong>Transport Time:</strong> 72 minutes</p>
                <p><strong>AI Risk Score:</strong> 79%</p>
            </div>

            <p>
                AI Summary: Multiple risk factors
                were detected during transportation.
            </p>
        `;
    }

    modalContent.innerHTML = report;

    modal.classList.remove("hidden");
    modal.classList.add("show");
}


// ========================================
// CLEAR ALERTS
// ========================================

function clearAlerts() {

    const alertList =
        document.getElementById("alertList");

    const alertCount =
        document.getElementById("alertCount");

    if (alertList) {

        alertList.innerHTML = `
            <div class="no-alerts">
                <i class="fa-solid fa-circle-check"></i>
                <h3>No Active Alerts</h3>
                <p>All alerts have been cleared.</p>
            </div>
        `;
    }

    if (alertCount) {
        alertCount.textContent = "0";
    }
}


// ========================================
// GPS TRACKING
// ========================================

function startTracking() {

    const gpsStatus =
        document.getElementById("gpsStatus");

    const currentLocation =
        document.getElementById("currentLocation");

    const button =
        document.querySelector(".track-btn");

    if (gpsStatus) {
        gpsStatus.textContent =
            "GPS tracking active";
    }

    if (button) {
        button.innerHTML =
            '<i class="fa-solid fa-location-crosshairs"></i> Tracking Active';
    }

    let position = 0;

    clearInterval(trackingInterval);

    trackingInterval = setInterval(function () {

        position += 5;

        if (position > 100) {
            position = 0;
        }

        if (currentLocation) {

            currentLocation.style.left =
                (20 + position * 0.6) + "%";

            currentLocation.style.top =
                (45 - position * 0.15) + "%";
        }

    }, 500);
}


// ========================================
// CLOSE MODAL OUTSIDE
// ========================================

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
    }
});


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const dashboard =
        document.getElementById("dashboard");

    if (dashboard) {
        dashboard.classList.remove("hidden");
        dashboard.classList.add("active");
    }

    runAI();
});