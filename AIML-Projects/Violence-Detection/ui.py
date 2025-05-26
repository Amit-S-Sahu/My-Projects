import tkinter as tk
from tkinter import messagebox
from tkinter import ttk
import threading
from main import start_detection

class ViolenceDetectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Violence Detection")
        self.root.geometry("400x300")
        self.root.resizable(False, False)

        style = ttk.Style()
        style.configure("TButton", font=("Arial", 14), padding=10)
        style.configure("TLabel", font=("Arial", 12))

        self.title_label = ttk.Label(self.root, text="Violence Detection", anchor="center", style="TLabel")
        self.title_label.pack(pady=20)

        self.status_label = ttk.Label(self.root, text="Status: Idle", anchor="center", style="TLabel")
        self.status_label.pack(pady=10)

        self.start_btn = ttk.Button(self.root, text="Start Detection", command=self.start_detection, style="TButton")
        self.start_btn.pack(pady=10)

        self.exit_btn = ttk.Button(self.root, text="Exit", command=self.close_window, style="TButton")
        self.exit_btn.pack(pady=20)

        self.detection_active = False

        self.root.protocol("WM_DELETE_WINDOW", self.close_window)

    def start_detection(self):
        if not self.detection_active:
            self.detection_active = True
            self.status_label.config(text="Status: Running")
            self.start_btn.config(text="Stop Detection")
            t = threading.Thread(target=self.run_detection)
            t.start()
        else:
            self.detection_active = False
            self.status_label.config(text="Status: Stopped")
            self.start_btn.config(text="Start Detection")

    def run_detection(self):
        start_detection()  # Calls the function from main.py for Violence detection

    def close_window(self):
        if self.detection_active:
            # You can add a confirmation message before closing the window if detection is running
            result = messagebox.askyesno("Confirm Exit", "Detection is still running. Do you want to stop it?")
            if result:
                self.detection_active = False
                self.status_label.config(text="Status: Stopped")
                self.start_btn.config(text="Start Detection")
                self.root.quit()  # Exit the application
        else:
            self.root.quit()  # Exit the application

# Initialize the Tkinter window
root = tk.Tk()
app = ViolenceDetectionApp(root)
root.mainloop()
