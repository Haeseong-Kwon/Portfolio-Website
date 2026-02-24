import os
import subprocess

projects = [
    {
        "name": "metasurface_designer",
        "url": "https://github.com/Haeseong-Kwon/Metasurface-Designer/blob/main/demo_smooth.gif?raw=true"
    },
    {
        "name": "yield_predictor",
        "url": "https://github.com/Haeseong-Kwon/Metasurface-Process-Yield-Predictor/blob/main/docs/yield_predictor_demo.gif?raw=true"
    },
    {
        "name": "dataset_factory",
        "url": "https://github.com/Haeseong-Kwon/Meta-Atom-Dataset-Factory/blob/main/dataset_factory_demo.webp?raw=true"
    },
    {
        "name": "brain_mri_assist",
        "url": "https://github.com/Haeseong-Kwon/Brain-MRI-Assist/blob/main/brain_mri_assist_demo.gif?raw=true"
    },
    {
        "name": "pinn_wavelab",
        "url": "https://github.com/Haeseong-Kwon/PINN-WaveLab/blob/main/pinn_wavelab_demo.gif?raw=true"
    },
    {
        "name": "optics_restoration",
        "url": "https://github.com/Haeseong-Kwon/Optics-Restoration-Studio/blob/main/optics_restoration_demo_v6_final.webp?raw=true"
    },
    {
        "name": "cmos_dashboard",
        "url": "https://github.com/Haeseong-Kwon/CMOS-Sensor-Health-Dashboard/blob/main/assets/sensor_dashboard_full_workflow.gif?raw=true"
    },
    {
        "name": "ar_vr_calibrator",
        "url": "https://github.com/Haeseong-Kwon/AR-VR-Display-Calibrator/blob/main/ar_vr_calibrator_demo.gif?raw=true"
    },
    {
        "name": "photonics_log_analyzer",
        "url": "https://github.com/Haeseong-Kwon/Photonics-Experiment-Log-Analyzer/blob/main/photonics_log_analyzer_demo.gif?raw=true"
    },
    {
        "name": "solar_cell_curve",
        "url": "https://github.com/Haeseong-Kwon/Solar-Cell-Curve-Intelligence/blob/main/solar_cell_intelligence_demo.gif?raw=true"
    },
    {
        "name": "medical_augmentor",
        "url": "https://github.com/Haeseong-Kwon/Medical-GenAI-Augmentor/blob/main/medical_augmentor_demo.gif?raw=true"
    }
]

output_dir = "public/projects"
os.makedirs(output_dir, exist_ok=True)

for project in projects:
    name = project['name']
    url = project['url']
    extension = url.split("?")[0].split(".")[-1]
    
    temp_file = os.path.join(output_dir, f"{name}.{extension}")
    output_file = os.path.join(output_dir, f"{name}.mp4")
    
    # Skip if mp4 already exists
    if os.path.exists(output_file):
        print(f"Skipping {name}.mp4 as it already exists.")
        continue
    
    print(f"Downloading {name} from {url}...")
    try:
        # Use curl to download the file directly, avoiding python's ssl certificate verification issues
        curl_command = ["curl", "-L", "-o", temp_file, url]
        subprocess.run(curl_command, check=True, capture_output=True)
        
        # Convert to mp4 using ffmpeg
        print(f"Converting {temp_file} to {output_file}...")
        # -movflags faststart to optimize for web playback
        # libx264, yuv420p for maximum compatibility
        command = [
            "ffmpeg", "-y", "-i", temp_file, 
            "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", # ensure dimensions are even
            "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", 
            "-crf", "23", "-preset", "slow", "-movflags", "+faststart", 
            output_file
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully converted {name}.mp4")
            # cleanup original
            os.remove(temp_file)
        else:
            print(f"Error converting {name}:")
            print(result.stderr)
            
    except Exception as e:
        print(f"Failed to process {name}: {str(e)}")

print("All done!")
