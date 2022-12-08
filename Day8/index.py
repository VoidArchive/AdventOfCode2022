directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]


def solve_part_1(grid):
    res = 0
    m = len(grid)
    n = len(grid[0])

    def isVisible(i, j):
        for di, dj in directions:
            ni, nj = i+di, j+dj

            while 0 <= ni < m and 0 <= nj < n and grid[ni][nj] < grid[i][j]:
                ni += di
                nj += dj

            if not (0 <= ni < m and 0 <= nj < n):
                return True

        return False

    for i in range(m):
        for j in range(n):
            if isVisible(i, j):
                res += 1

    return res


def solve_part_2(grid):
    res = 0
    m = len(grid)
    n = len(grid[0])

    def score(i, j):
        s = 1
        for di, dj in directions:
            curr = 0
            ni, nj = i+di, j+dj

            while 0 <= ni < m and 0 <= nj < n:
                curr += 1
                if grid[ni][nj] >= grid[i][j]:
                    break

                ni += di
                nj += dj

            s *= curr

        return s

    for i in range(m):
        for j in range(n):
            res = max(res, score(i, j))

    return res


if __name__ == '__main__':
    with open('input.txt') as f:
        grid = []
        for line in f.readlines():
            grid.append(list(map(int, line.strip())))

    print(solve_part_1(grid))
    print(solve_part_2(grid))
