class Category:
    def __init__(self, category):
        self.category = category
        self.ledger = []

    def __str__(self):
        s = self.category.center(30, "*") + "\n"
        for item in self.ledger:
            temp = f"{item['description'][:23]:23}{item['amount']:7.2f}"
            s += temp + "\n"
        s += "Total: " + str(self.get_balance())
        return s

    def deposit(self, amount, description=""):
        temp = {}
        temp['amount'] = amount
        temp['description'] = description
        self.ledger.append(temp)

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            temp = {}
            temp['amount'] = 0 - amount
            temp['description'] = description
            self.ledger.append(temp)
            return True
        return False

    def get_balance(self):
        balance = 0
        for item in self.ledger:
            balance += item['amount']
        return balance

    def transfer(self, amount, budget_cat):
        if self.check_funds(amount):
            self.withdraw(amount, "Transfer to " + budget_cat.category)
            budget_cat.deposit(amount, "Transfer from " + self.category)
            return True
        return False

    def check_funds(self, amount):
        if amount > self.get_balance():
            return False
        return True


def create_spend_chart(categories):
    if len(categories) == 0:
        return "No categories found. Please add categories to generate spend chart."

    spend = [sum(abs(item['amount']) for item in category.ledger if item['amount'] < 0) for category in categories]
    total = sum(spend)

    if total == 0:
        return "No transactions found. Please make transactions to generate spend chart."

    percentage = [i / total * 100 for i in spend]

    s = "Percentage spent by category"
    for i in range(100, -1, -10):
        s += "\n" + str(i).rjust(3) + "|"
        for j in percentage:
            if j > i:
                s += " o "
            else:
                s += "   "
        s += " "
    s += "\n    ----------"

    cat_length = [len(category.category) for category in categories]
    max_length = max(cat_length)

    for i in range(max_length):
        s += "\n    "
        for j in range(len(categories)):
            if i < cat_length[j]:
                s += " " + categories[j].category[i] + " "
            else:
                s += "   "
        s += " "

    return s

categories = []

while True:
    print("\nMenu:")
    print("1. Initially deposit")
    print("2. Add a category")
    print("3. Deposit in category")
    print("4. Withdraw from category")
    print("5. Transfer from one category to another")
    print("6. Create spend chart")
    print("7. Exit")

    choice = input("Enter your choice: ")

    if choice == '1':
        category_name = input("Enter category name: ")
        initial_deposit = float(input("Enter initial deposit amount: "))
        category = Category(category_name)
        category.deposit(initial_deposit, "Initial deposit")
        categories.append(category)
        print("Category added successfully with initial deposit.")

    elif choice == '2':
        category_name = input("Enter category name: ")
        category = Category(category_name)
        categories.append(category)
        print("Category added successfully.")

    elif choice == '3':
        print("Select a category to deposit:")
        for idx, category in enumerate(categories, start=1):
            print(f"{idx}. {category.category}")
        selected_idx = int(input("Enter category number: ")) - 1
        amount = float(input("Enter deposit amount: "))
        description = input("Enter description (optional): ")
        categories[selected_idx].deposit(amount, description)
        print("Amount deposited successfully.")

    elif choice == '4':
        print("Select a category to withdraw from:")
        for idx, category in enumerate(categories, start=1):
            print(f"{idx}. {category.category}")
        selected_idx = int(input("Enter category number: ")) - 1
        amount = float(input("Enter withdrawal amount: "))
        description = input("Enter description (optional): ")
        if categories[selected_idx].withdraw(amount, description):
            print("Amount withdrawn successfully.")
        else:
            print("Insufficient funds.")

    elif choice == '5':
        print("Select a category to transfer from:")
        for idx, category in enumerate(categories, start=1):
            print(f"{idx}. {category.category}")
        from_idx = int(input("Enter category number to transfer from: ")) - 1
        print("Select a category to transfer to:")
        for idx, category in enumerate(categories, start=1):
            print(f"{idx}. {category.category}")
        to_idx = int(input("Enter category number to transfer to: ")) - 1
        amount = float(input("Enter transfer amount: "))
        if categories[from_idx].transfer(amount, categories[to_idx]):
            print("Amount transferred successfully.")
        else:
            print("Transfer failed. Insufficient funds.")

    elif choice == '6':
        print(create_spend_chart(categories))

    elif choice == '7':
        print("Exiting the program.")
        break

    else:
        print("Invalid choice. Please enter a valid option.")
