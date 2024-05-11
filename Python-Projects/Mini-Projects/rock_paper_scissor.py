import random

def play_game():
    print("Let's play Rock, Paper, Scissors!")
    print("Choose one: (1) Rock, (2) Paper, (3) Scissors")
    player_choice = int(input("Enter your choice: "))

    computer_choice = random.randint(1, 3)

    print("You chose:")
    if player_choice == 1:
        print("    _______")
        print("---'   ____)")
        print("      (_____)")
        print("      (_____)")
        print("      (____)")
        print("---.__(___)")
    elif player_choice == 2:
        print("    _______")
        print("---'   ____)____")
        print("          ______)")
        print("          _______)")
        print("         _______)")
        print("---.__________)")
    elif player_choice == 3:
        print("    _______")
        print("---'   ____)____")
        print("          ______)")
        print("       __________)")
        print("      (____)")
        print("---.__(___)")

    # Print computer's choice
    print("Computer chose:")
    if computer_choice == 1:
        print("    _______")
        print("---'   ____)")
        print("      (_____)")
        print("      (_____)")
        print("      (____)")
        print("---.__(___)")
    elif computer_choice == 2:
        print("    _______")
        print("---'   ____)____")
        print("          ______)")
        print("          _______)")
        print("         _______)")
        print("---.__________)")
    elif computer_choice == 3:
        print("    _______")
        print("---'   ____)____")
        print("          ______)")
        print("       __________)")
        print("      (____)")
        print("---.__(___)")

    if player_choice == computer_choice:
        print("It's a tie!")
    elif (player_choice == 1 and computer_choice == 3) or \
            (player_choice == 2 and computer_choice == 1) or \
            (player_choice == 3 and computer_choice == 2):
        print("You win!")
    else:
        print("Computer wins!")

play_game()