import re
import secrets
import string


def generate_password(length=16, nums=1, special_chars=1, uppercase=1, lowercase=1):

    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

    while True:
        password = ''
        # Generate password
        for _ in range(length):
            password += secrets.choice(all_characters)
        
        constraints = [
            (nums, r'\d'),
            (special_chars, fr'[{symbols}]'),
            (uppercase, r'[A-Z]'),
            (lowercase, r'[a-z]')
        ]

        # Check constraints        
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
            break
    
    return password
    

if __name__ == '__main__':

    length = int(input('Enter the length of the password: '))
    nums = int(input('Enter the number of digits in the password: '))
    special_chars = int(input('Enter the number of special characters in the password: '))
    uppercase = int(input('Enter the number of uppercase letters in the password: '))
    lowercase = int(input('Enter the number of lowercase letters in the password: '))

    new_password = generate_password(length, nums, special_chars, uppercase, lowercase)

    print('Generated password:', new_password)