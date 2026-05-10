# MMM-GasMonitor – MagicMirror² Module for GasMonitor

![MagicMirror](https://img.shields.io/badge/MagicMirror-Module-blue)
![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-Integration-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

MMM-GasMonitor is a MagicMirror² module that displays real‑time gas sensor data from the **GasMonitor** system running on a Raspberry Pi Zero W.

It connects to the GasMonitor API and shows:

- MQ‑2 value  
- TGS2610 value  
- Baseline  
- System state (OK / ALERT / SILENCED / ERROR)  
- MQ‑2 history  
- Visual indicators  

This module is lightweight, fast, and designed for 24/7 operation.

---

## 📡 Requirements

This module requires the GasMonitor backend running on a Raspberry Pi:

👉 **GasMonitor Repository**  
[https://github.com/damag3/GasMonitor]

GasMonitor exposes the API endpoint:
http://<PI_IP>:8080/data

---

## 📦 Installation

Clone the module into your MagicMirror modules folder:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR_USER/MMM-GasMonitor
cd MMM-GasMonitor
npm install


⚙️ Configuration
Add the module to your config.js:

js
{
    module: "MMM-GasMonitor",
    position: "top_right",
    config: {
        url: "http://192.168.1.70:8080/data",
        updateInterval: 1000
    }
}

🧠 How It Works
Fetches JSON data from the GasMonitor API

Parses MQ‑2, TGS, baseline, and system state

Displays values in a compact MagicMirror‑friendly layout

Updates automatically

Shows color‑coded status indicators

📊 Displayed States
State	Meaning
OK	Normal readings
ALERT	Gas levels above threshold
SILENCED	Alarm muted (cooldown active)
ERROR	Sensor or ADS1115 error


