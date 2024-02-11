def convert_to_snake_case(pascal_or_camel_cased_string):

    snake_cased_char_list = [
        '_' + char.lower() if char.isupper()
        else char
        for char in pascal_or_camel_cased_string
    ]

    return ''.join(snake_cased_char_list).strip('_')


def main():
    input_string = input('Enter a string in PascalCase or camelCase: ')
    snake_case_string = convert_to_snake_case(input_string)
    print(snake_case_string)
    

if __name__ == '__main__':
    main()