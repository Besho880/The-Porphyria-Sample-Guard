
// ========================================
// The Porphyria Sample Guard - JAVASCRIPT
// ========================================

let sensorData = {
    temperature: 18,
    light: 5,
    transportTime: 25
};

let trackingInterval = null;
let trackingPosition = 0;

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
// UPDATE SENSOR DISPLAYS
// ========================================

function updateSensorDisplays() {
    const temperature = document.getElementById("temperature");
    const light = document.getElementById("light");
    const time = document.getElementById("transportTime");

    if (temperature) {
        temperature.textContent = sensorData.temperature.toFixed(1) + "°C";
    }

    if (light) {
        light.textContent = sensorData.light + " lux";
    }

    if (time) {
        time.textContent = sensorData.transportTime + " min";
    }
}

// ========================================
// CALCULATE SAMPLE RISK
// Rule-based simulated analysis
// ========================================

function calculateRisk() {
    let risk = 15;
    let factors = [];

    if (sensorData.temperature >= 27) {
        risk += 45;
        factors.push("High temperature");
    } else if (sensorData.temperature >= 24) {
        risk += 25;
        factors.push("Elevated temperature");
    }

    if (sensorData.light >= 50) {
        risk += 30;
        factors.push("High light exposure");
    } else if (sensorData.light >= 20) {
        risk += 15;
        factors.push("Increased light exposure");
    }

    if (sensorData.transportTime >= 60) {
        risk += 25;
        factors.push("Long transport time");
    } else if (sensorData.transportTime >= 40) {
        risk += 10;
        factors.push("Extended transport time");
    }

    risk = Math.min(risk, 100);

    let level = "Low Risk";

    if (risk >= 70) {
        level = "High Risk";
    } else if (risk >= 35) {
        level = "Warning";
    }

    let mainFactor = factors.length > 0
        ? factors[0]
        : "Recorded test conditions";

    if (sensorData.temperature >= 27) {
        mainFactor = "Temperature";
    } else if (sensorData.light >= 50) {
        mainFactor = "Light Level";
    } else if (sensorData.transportTime >= 60) {
        mainFactor = "Transport Time";
    }

    let pattern =
        "Conditions stayed within the recorded test values.";

    if (sensorData.temperature >= 27) {
        pattern = "High temperature detected.";
    } else if (sensorData.light >= 50) {
        pattern = "High light exposure detected.";
    } else if (sensorData.transportTime >= 60) {
        pattern = "Transport time is longer than expected.";
    } else if (factors.length > 0) {
        pattern = "Some changes were detected in the transport data.";
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
// RUN ANALYSIS
// ========================================

function runAI() {
    updateSensorDisplays();

    const result = calculateRisk();

    const riskScore = document.getElementById("riskScore");
    const aiScore = document.getElementById("aiScore");
    const aiLevel = document.getElementById("aiLevel");
    const mainFactor = document.getElementById("mainFactor");
    const pattern = document.getElementById("pattern");
    const aiSummary = document.getElementById("aiSummary");
    const recommendation = document.getElementById("recommendation");

    if (riskScore) {
        riskScore.textContent = result.risk + "%";
    }

    if (aiScore) {
        aiScore.textContent = result.risk + "%";
    }

    if (aiLevel) {
        aiLevel.textContent = result.level;
    }

    if (mainFactor) {
        mainFactor.textContent = result.mainFactor;
    }

    if (pattern) {
        pattern.textContent = result.pattern;
    }

    if (aiSummary) {
        if (result.risk >= 70) {
            aiSummary.textContent =
                "Several risk factors were detected in the recorded data.";
        } else if (result.risk >= 35) {
            aiSummary.textContent =
                "Some unusual changes were detected in the transport conditions.";
        } else {
            aiSummary.textContent =
                "No major problems were found in the recorded transport conditions.";
        }
    }

    if (recommendation) {
        if (result.risk >= 70) {
            recommendation.textContent =
                "Check the sample and transport conditions immediately.";
        } else if (result.risk >= 35) {
            recommendation.textContent =
                "Monitor the sample and check the transport conditions.";
        } else {
            recommendation.textContent =
                "Continue monitoring the sample and record the conditions.";
        }
    }

    updateSampleStatus(result);
    updateAlertCount(result);

    console.log("Analysis result:", result);

    return result;
}

// ========================================
// UPDATE SAMPLE STATUS
// ========================================

function updateSampleStatus(result) {
    const status = document.getElementById("sampleStatus");
    const message = document.getElementById("statusMessage");

    if (status) {
        status.textContent = result.level.toUpperCase();

        status.classList.remove(
            "safe",
            "warning",
            "high-risk",
            "low-risk"
        );

        if (result.risk >= 70) {
            status.classList.add("high-risk");
        } else if (result.risk >= 35) {
            status.classList.add("warning");
        } else {
            status.classList.add("safe");
        }
    }

    if (message) {
        if (result.risk >= 70) {
            message.textContent =
                "Immediate attention is recommended.";
        } else if (result.risk >= 35) {
            message.textContent =
                "Some unusual conditions were detected.";
        } else {
            message.textContent =
                "No major problems detected in this simulated test.";
        }
    }
}

// ========================================
// UPDATE ALERT COUNT
// ========================================

function updateAlertCount(result) {
    const alertCount = document.getElementById("alertCount");

    if (!alertCount) {
        return;
    }

    if (result.risk >= 35) {
        alertCount.textContent = "1";
    } else {
        alertCount.textContent = "0";
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

    runAI();
}

// ========================================
// SENSOR DETAILS
// ========================================

function openSensor(sensor) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");

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
            "The sensor records temperature during the simulated transport.";

    } else if (sensor === "light") {
        title = "Light Sensor";
        icon = "☀️";

        description =
            "<strong>Current Light Level:</strong> " +
            sensorData.light +
            " lux<br><br>" +
            "The sensor records light exposure inside the transport box.";

    } else if (sensor === "time") {
        title = "Transport Time";
        icon = "⏱️";

        description =
            "<strong>Transport Time:</strong> " +
            sensorData.transportTime +
            " minutes<br><br>" +
            "The system records how long the sample has been transported.";

    } else {
        return;
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
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hidden");
    }
}

// ========================================
// VIEW SAMPLE REPORTS
// ========================================

function viewReport(trip) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        return;
    }

    const reports = {
        "PG-001": {
            status: "Low Risk",
            temperature: "18°C",
            light: "5 lux",
            time: "25 minutes",
            risk: "15%",
            summary:
                "In this simulated test, PG-001 recorded 18°C, " +
                "5 lux of light, and 25 minutes of transportation. " +
                "The estimated risk score was 15%, indicating low risk " +
                "under the recorded test conditions."
        },

        "PG-002": {
            status: "Warning",
            temperature: "24.8°C",
            light: "22 lux",
            time: "46 minutes",
            risk: "65%",
            summary:
                "This simulated test recorded higher temperature " +
                "and light exposure, along with a longer transport time. " +
                "The rule-based analysis marked these conditions as a warning."
        },

        "PG-003": {
            status: "High Risk",
            temperature: "27.1°C",
            light: "61 lux",
            time: "72 minutes",
            risk: "100%",
            summary:
                "This simulated test recorded high temperature, " +
                "high light exposure, and a long transport time. " +
                "The analysis marked the sample as high risk."
        }
    };

    const report = reports[trip];

    if (!report) {
        modalContent.innerHTML = `
            <h2>Report Not Found</h2>
            <p>Please select a valid sample report.</p>
        `;
    } else {
        modalContent.innerHTML = `
            <h2>Trip Report - ${trip}</h2>

            <div class="report-info">
                <p><strong>Status:</strong> ${report.status}</p>
                <p><strong>Temperature:</strong> ${report.temperature}</p>
                <p><strong>Light:</strong> ${report.light}</p>
                <p><strong>Transport Time:</strong> ${report.time}</p>
                <p><strong>Risk Score:</strong> ${report.risk}</p>
            </div>

            <p><strong>Summary:</strong> ${report.summary}</p>

            <p>
                <small>
                    This is a simulated result, not a medical assessment.
                </small>
            </p>
        `;
    }

    modal.classList.remove("hidden");
    modal.classList.add("show");
}

// ========================================
// CLEAR ALERTS
// ========================================

function clearAlerts() {
    const alertList = document.getElementById("alertList");
    const alertCount = document.getElementById("alertCount");

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
// SIMULATED GPS TRACKING
// ========================================

function startTracking() {
    const gpsStatus = document.getElementById("gpsStatus");
    const currentLocation = document.getElementById("currentLocation");
    const button = document.querySelector(".track-btn");

    // Clicking again stops the simulated tracking.
    if (trackingInterval !== null) {
        clearInterval(trackingInterval);
        trackingInterval = null;

        if (gpsStatus) {
            gpsStatus.textContent = "GPS tracking paused";
        }

        if (button) {
            button.innerHTML =
                '<i class="fa-solid fa-location-crosshairs"></i> Start Tracking';
        }

        return;
    }

    if (gpsStatus) {
        gpsStatus.textContent = "Simulated tracking active";
    }

    if (button) {
        button.innerHTML =
            '<i class="fa-solid fa-pause"></i> Stop Tracking';
    }

    trackingInterval = setInterval(function () {
        trackingPosition = (trackingPosition + 5) % 101;

        if (currentLocation) {
            currentLocation.style.left =
                (20 + trackingPosition * 0.6) + "%";

            currentLocation.style.top =
                (45 - trackingPosition * 0.15) + "%";
        }
    }, 500);
}

// ========================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ========================================

window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");

    if (modal && event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key.
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    const dashboard = document.getElementById("dashboard");

    if (dashboard) {
        document.querySelectorAll(".page").forEach(function (page) {
            page.classList.add("hidden");
            page.classList.remove("active");
        });

        dashboard.classList.remove("hidden");
        dashboard.classList.add("active");
    }

    runAI();
});
