import copy
import random

class Hat:

    def __init__(self, **kwargs):
        self.contents = []
        for key, value in kwargs.items():
            for _ in range(value):
                self.contents.append(key)

    def draw(self, number):
        if number > len(self.contents):
            return self.contents
        if number < 0:
            raise ValueError("Number of balls drawn cannot be negative.")
        balls = []
        for _ in range(number):
            choice = random.randrange(len(self.contents))
            balls.append(self.contents.pop(choice))
        return balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    if num_experiments == 0:
        raise ValueError("Number of experiments cannot be zero.")
    
    total_expected_balls = sum(expected_balls.values())
    successes = 0

    for _ in range(num_experiments):
        new_hat = copy.deepcopy(hat)
        balls = new_hat.draw(num_balls_drawn)

        no_of_balls = {key: balls.count(key) for key in expected_balls}

        if all(no_of_balls[key] >= expected_balls[key] for key in expected_balls):
            successes += 1

    return successes / num_experiments


def main():
    random.seed(95)

    try:
        blue = int(input("Enter the number of blue balls: "))
        red = int(input("Enter the number of red balls: "))
        green = int(input("Enter the number of green balls: "))

        if blue < 0 or red < 0 or green < 0:
            raise ValueError("Number of balls cannot be negative.")

        hat = Hat(blue=blue, red=red, green=green)

        while True:
            print("\nMenu:")
            print("1. Calculate Probability")
            print("2. Exit")

            choice = input("Enter your choice: ")

            if choice == "1":
                expected_blue = int(input("Enter the expected number of blue balls: "))
                expected_red = int(input("Enter the expected number of red balls: "))
                num_balls_drawn = int(input("Enter the number of balls drawn: "))
                num_experiments = int(input("Enter the number of experiments: "))

                probability = experiment(
                    hat=hat,
                    expected_balls={"blue": expected_blue,
                                    "red": expected_red},
                    num_balls_drawn=num_balls_drawn,
                    num_experiments=num_experiments)
                print("Probability:", probability)

            elif choice == "2":
                print("Exiting...")
                break
            else:
                print("Invalid choice. Please enter a valid option.")
    
    except ValueError as ve:
        print("Error:", ve)


if __name__ == "__main__":
    main()
