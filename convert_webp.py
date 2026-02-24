from PIL import Image
import subprocess
import os
import shutil

def convert_webp_to_mp4(webp_path, mp4_path, temp_dir="temp_frames"):
    print(f"Converting {webp_path} to {mp4_path}")
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
        
    try:
        # Load the animated webp
        img = Image.open(webp_path)
        
        frame_num = 0
        durations = []
        
        # Extract frames
        while True:
            # Save frame
            frame_path = os.path.join(temp_dir, f"frame_{frame_num:04d}.png")
            # Convert to RGB if necessary (e.g. from RGBA)
            if img.mode != 'RGB':
                rgb_img = Image.new("RGB", img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
                rgb_img.save(frame_path)
            else:
                img.save(frame_path)
                
            durations.append(img.info.get('duration', 100)) # Default 100ms if not specified
            
            frame_num += 1
            try:
                img.seek(frame_num)
            except EOFError:
                break
                
        print(f"Extracted {frame_num} frames")
        
        # Calculate average framerate
        avg_duration_ms = sum(durations) / len(durations)
        framerate = 1000 / avg_duration_ms
        print(f"Calculated framerate: {framerate:.2f} fps")
        
        # Use ffmpeg to stitch frames back into mp4
        command = [
            "ffmpeg", "-y", 
            "-framerate", str(framerate),
            "-i", os.path.join(temp_dir, "frame_%04d.png"),
            "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
            "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", 
            "-crf", "23", "-preset", "slow", "-movflags", "+faststart", 
            mp4_path
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully converted to {mp4_path}")
        else:
            print(f"Error converting to MP4:")
            print(result.stderr)
            
    except Exception as e:
        print(f"Error processing {webp_path}: {e}")
    finally:
        # Cleanup
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

if __name__ == "__main__":
    convert_webp_to_mp4("public/projects/dataset_factory.webp", "public/projects/dataset_factory.mp4", "temp_dataset")
    convert_webp_to_mp4("public/projects/optics_restoration.webp", "public/projects/optics_restoration.mp4", "temp_optics")
