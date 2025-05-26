from tensorflow.keras.utils import plot_model
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import LSTM

class CustomLSTM(LSTM):
    def __init__(self, *args, **kwargs):
        kwargs.pop('time_major', None)
        super().__init__(*args, **kwargs)

# Load model
model = load_model(r"model\model.h5", custom_objects={"LSTM": CustomLSTM})

# Plot the model with a horizontal layout
plot_model(model, to_file="model_grid.png", show_shapes=True, show_layer_names=True, rankdir='LR', dpi=100)

