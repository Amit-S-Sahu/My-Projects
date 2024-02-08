class Rectangle:

    def __init__(self, width, height):
        self.width = width
        self.height = height


    def __str__(self):
        return "Rectangle(width=" + str(self.width) + ", height=" + str(self.height) + ")"


    def set_width(self, width):
        self.width = width


    def set_height(self, height):
        self.height = height


    def get_area(self):
        return self.width * self.height


    def get_perimeter(self):
        return 2 * (self.width + self.height)


    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** .5


    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        rectangle = ("*" * self.width + "\n") * self.height
        return rectangle


    def get_amount_inside(self, shape):
        max_width = self.width // shape.width
        max_height = self.height // shape.height
        return max_width * max_height


class Square(Rectangle):

    def __init__(self, length):
        super().__init__(length, length)


    def __str__(self):
        return "Square(side=" + str(self.width) + ")"


    def set_side(self, side):
        self.width = side
        self.height = side


    def set_width(self, side):
        self.width = side
        self.height = side


    def set_height(self, side):
        self.width = side
        self.height = side


def create_rectangle():
    width = int(input("Enter the width of the rectangle: "))
    height = int(input("Enter the height of the rectangle: "))
    return Rectangle(width, height)


def create_square():
    side = int(input("Enter the side length of the square: "))
    return Square(side)


def display_menu():
    print("1. Create Rectangle")
    print("2. Create Square")
    print("3. Exit")


def main():
    while True:
        display_menu()
        choice = input("Enter your choice: ")

        if choice == "1":
            rect = create_rectangle()
            print(rect)
            print("Area:", rect.get_area())
            print("Perimeter:", rect.get_perimeter())
            print("Diagonal:", rect.get_diagonal())
            print("Picture:")
            print(rect.get_picture())
        elif choice == "2":
            sq = create_square()
            print(sq)
            print("Area:", sq.get_area())
            print("Perimeter:", sq.get_perimeter())
            print("Diagonal:", sq.get_diagonal())
            print("Picture:")
            print(sq.get_picture())
        elif choice == "3":
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please enter a valid option.")


if __name__ == "__main__":
    main()
