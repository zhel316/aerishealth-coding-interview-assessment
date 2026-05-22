import sys


def calculate_min_crafts(units):
    return (units + 5) // 6

def calculate_max_crafts(units):
    return units // 4

def solve(input_data):
    values = input_data.split()
    if not values:
        return ""

    test_case_count = int(values[0])
    results = []

    for i in range(1, test_case_count + 1):
        units = int(values[i])          
        if units % 2 == 1 or units < 4:
            results.append("-1")
        else:
            min_crafts = calculate_min_crafts(units)
            max_crafts = calculate_max_crafts(units)
            results.append(f"{min_crafts} {max_crafts}")

    return "\n".join(results)


def main():
    print(solve(sys.stdin.read()))


if __name__ == "__main__":
    main()
