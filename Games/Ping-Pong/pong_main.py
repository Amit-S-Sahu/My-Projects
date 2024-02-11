from turtle import Screen, Turtle

screen = Screen()
screen.bgcolor('black')
screen.setup(width=800, height=600)
screen.title('Ping Pong Game')
screen.tracer(0)

paddle = Turtle('square')
paddle.color('white')
paddle.penup()
paddle.shapesize(stretch_wid=5, stretch_len=1)
paddle.goto(350, 0)
screen.listen()

def go_up():
    if paddle.ycor() < 260:
        new_y = paddle.ycor() + 20
        paddle.goto(paddle.xcor(), new_y)

def go_down():
    if paddle.ycor() > -240:
        new_y = paddle.ycor() - 20
        paddle.goto(paddle.xcor(), new_y)

screen.onkeypress(go_up, 'Up')
screen.onkeypress(go_down, 'Down')

game_is_on = True
while game_is_on:
    screen.update()


screen.exitonclick()