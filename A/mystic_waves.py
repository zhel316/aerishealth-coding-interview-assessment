import sys


def calculate_total_energy(energy, wave_count):
    return energy if wave_count % 2 == 1 else 0


def solve(input_data):
    values = input_data.split()
    if not values:
        return ""

    test_case_count = int(values[0])
    results = []

    value_index = 1
    for _ in range(test_case_count):
        energy = int(values[value_index])
        wave_count = int(values[value_index + 1])
        results.append(str(calculate_total_energy(energy, wave_count)))
        value_index += 2

    return "\n".join(results)


def main():
    print(solve(sys.stdin.read()))


if __name__ == "__main__":
    main()
