import pathlib
content = ''
with open(pathlib.Path(__file__).parent / 'input.txt', mode='r') as file:
    content = file.read()

p1 = 0
p2 = 0

H: complex = 0J
tails: list[complex] = [0J for x in range(9)]
tails_pos: list[set[complex]] = [{tails[x], } for x in range(9)]
for line in content.split('\n'):
    if not line:
        continue
    for hhgreg in range(int(line[2:])):
        H += {'R': 1, 'U': 1J, 'L': -1, 'D': -1J, }[line[0]]
        hh = H
        for ii in range(9):
            hh -= tails[ii]
            if 2 <= abs(hh):
                tails[ii] += complex(
                    min(1, max(-1, hh.real)),
                    min(1, max(-1, hh.imag)),
                )
                tails_pos[ii].add(tails[ii])
            hh = tails[ii]

p1 = len(tails_pos[0])
p2 = len(tails_pos[8])

print(tails_pos)
print(p1)
print(p2)
