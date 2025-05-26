# Add at the top
import threading

def start_detection():
    import cv2
    import mediapipe as mp
    import pandas as pd
    import numpy
    import keras
    import pygame
    from keras.models import load_model
    from keras.layers import LSTM

    pygame.mixer.init()
    alert_sound = pygame.mixer.Sound(r"utils/alert.wav")
    cap = cv2.VideoCapture(0)

    mpPose = mp.solutions.pose
    pose = mpPose.Pose()
    mpDraw = mp.solutions.drawing_utils

    class CustomLSTM(LSTM):
        def __init__(self, *args, **kwargs):
            kwargs.pop('time_major', None)
            super().__init__(*args, **kwargs)

    model = load_model(r"model/lstm-model.h5", custom_objects={"LSTM": CustomLSTM})
    lm_list = []
    label = "neutral"
    is_playing = False

    def m_ld(results):
        c_lm = []
        for lm in results.pose_landmarks.landmark:
            c_lm.extend([lm.x, lm.y, lm.z, lm.visibility])
        return c_lm

    def draw_landmark_on_image(mpDraw, results, frame):
        mpDraw.draw_landmarks(frame, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
        return frame

    def draw_class_on_image(label, img):
        fontColor = (0, 0, 255) if label == "punch" else (0, 255, 0)
        cv2.putText(img, str(label), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, fontColor, 2, 2)
        return img

    def detect(model, lm_list):
        nonlocal label, is_playing
        lm_list = numpy.array(lm_list)
        lm_list = numpy.expand_dims(lm_list, axis=0)
        result = model.predict(lm_list)
        if result[0][0] > 0.5:
            label = "punch"
            if not is_playing:
                alert_sound.play(-1)
                is_playing = True
        else:
            label = "neutral"
            if is_playing:
                alert_sound.stop()
                is_playing = False
        return str(label)

    i = 0
    warm_up_frames = 60

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frameRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frameRGB)
        i += 1

        if i > warm_up_frames:
            if results.pose_landmarks:
                lm = m_ld(results)
                lm_list.append(lm)

                if len(lm_list) == 20:
                    threading.Thread(target=detect, args=(model, lm_list)).start()
                    lm_list = []

                xc, yc = [], []
                for lm in results.pose_landmarks.landmark:
                    h, w, c = frame.shape
                    cx, cy = int(lm.x * w), int(lm.y * h)
                    xc.append(cx)
                    yc.append(cy)

                color, thickness = ((0, 0, 255), 1) if label == "punch" else ((0, 255, 0), 3)
                cv2.rectangle(frame, (min(xc), min(yc) - 25), (max(xc), max(yc)), color, thickness)
                frame = draw_landmark_on_image(mpDraw, results, frame)

            frame = draw_class_on_image(label, frame)
            cv2.imshow("Pose Detection", frame)
            if cv2.waitKey(1) == ord('q'):
                break

    df = pd.DataFrame(lm_list)
    # df.to_csv(label + ".txt", index=False)
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    start_detection()