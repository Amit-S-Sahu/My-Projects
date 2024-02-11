from turtle import Turtle, Screen

tim = Turtle()
screen = Screen()
screen.title('Etch-a-Sketch')

def move_forward():
    tim.forward(10)


def turn_left():
    tim.left(10)


def turn_right():
    tim.right(10)
    

def move_backward():
    tim.backward(10)


def clear():
    tim.home()
    tim.clear()


tim.speed('fastest')

screen.listen()
screen.onkeypress(key='w', fun=move_forward)
screen.onkeypress(key='a', fun=turn_left)
screen.onkeypress(key='s', fun=move_backward)
screen.onkeypress(key='d', fun=turn_right)
screen.onkey(key='c', fun=clear)
screen.exitonclick()