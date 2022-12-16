import { Advent, f, fm, chr, ord, arr } from 'advent';
import { Set, Map } from 'immutable';

const { compute, computeCheck } = await Advent({ day: 16 });

compute(2, async (input) => {
  const data = input.parse(
    f.nl(
      f.match`Valve ${fm.word().as('name')} .* rate=${fm
        .int()
        .as('rate')}; .* valves? ${fm.str().as('tunnelsStr')}`
    )
  );
  let locs = Map(
    data.map((x) => [
      x.name,
      { rate: x.rate, tunnels: x.tunnelsStr.split(', ') },
    ])
  );
  let paths = Map<string, Map<string, number>>();

  for (const line of data) {
    let queue = [line.name];
    let dist = Map<string, number>([[line.name, 0]]);
    let seen = Set<string>([line.name]);

    while (queue.length > 0) {
      let name = queue.shift()!;
      let d = dist.get(name)!;

      for (const tunnel of locs.get(name)!.tunnels) {
        if (!seen.has(tunnel)) {
          seen = seen.add(tunnel);
          dist = dist.set(tunnel, d + 1);
          queue.push(tunnel);
        }
      }
    }

    paths = paths.set(line.name, dist);
  }

  // console.log(JSON.stringify(paths));

  let nonzero = locs
    .filter((loc) => loc.rate > 0)
    .keySeq()
    .toArray();
  console.log(nonzero.length);
  // let ans = 0;

  let dp = arr(31, () =>
    arr(nonzero.length, () => arr(1 << nonzero.length, () => -99999999))
  );
  let prev = arr(31, () =>
    arr(nonzero.length, () =>
      arr(
        1 << nonzero.length,
        (): [number, number, number] | undefined => undefined
      )
    )
  );

  for (let i = 0; i < nonzero.length; i++) {
    let dist = paths.get('AA')!.get(nonzero[i])!;
    dp[dist + 1][i][1 << i] = 0;
    // console.log("base", dist + 1, i, 1 << i);
  }

  const getFlow = (mask: number) => {
    let ans = 0;

    for (let i = 0; i < nonzero.length; i++) {
      if (((1 << i) & mask) !== 0) {
        ans += locs.get(nonzero[i])!.rate;
      }
    }

    return ans;
  };

  console.log(nonzero);

  let ans = 0;

  for (let i = 1; i < 31; i++) {
    console.log(i);
    for (let j = 0; j < 1 << nonzero.length; j++) {
      for (let k = 0; k < nonzero.length; k++) {
        const flow = getFlow(j);

        const hold = dp[i - 1][k][j] + flow;
        if (hold > dp[i][k][j]) {
          dp[i][k][j] = hold;
          prev[i][k][j] = [i - 1, k, j];
        }

        // console.log(i, k, j.toString(2), dp[i][k][j]);
        ans = Math.max(ans, dp[i][k][j]);

        // console.log(i, j, k);
        if (((1 << k) & j) === 0) {
          // console.log(k, "not in", j);
          continue;
        }

        for (let l = 0; l < nonzero.length; l++) {
          // console.log(i, j, k, l);
          if (((1 << l) & j) !== 0) {
            // console.log(l, "already in", j, "|", i, k);
            continue;
          }

          let dist = paths.get(nonzero[k])!.get(nonzero[l])!;

          if (i + dist + 1 >= 31) {
            continue;
          }
          // console.log(i, k, j, "->", i + dist + 1, l, j | (1 << l), dp[i + dist + 1][l][j | (1 << l)], dp[i][k][j] + flow * (dist + 1));
          const value = dp[i][k][j] + flow * (dist + 1);
          if (value > dp[i + dist + 1][l][j | (1 << l)]) {
            dp[i + dist + 1][l][j | (1 << l)] = value;
            prev[i + dist + 1][l][j | (1 << l)] = [i, k, j];
          }
        }
      }
    }
  }

  // let cur = [30, 4, (1 << nonzero.length) - 1];

  // while (cur !== undefined) {
  // 	console.log(cur, dp[cur[0]][cur[1]][cur[2]]);
  // 	cur = prev[cur[0]][cur[1]][cur[2]]!;
  // }
  let ans2 = 0;

  for (let i = 0; i < 1 << nonzero.length; i++) {
    for (let j = 0; j < 1 << nonzero.length; j++) {
      if ((i & j) !== j) {
        continue;
      }

      let a = -99999999;
      let b = -99999999;

      for (let k = 0; k < nonzero.length; k++) {
        a = Math.max(a, dp[26][k][j]);
      }

      for (let k = 0; k < nonzero.length; k++) {
        b = Math.max(b, dp[26][k][i & ~j]);
      }

      ans2 = Math.max(ans2, a + b);
    }
  }

  // return ans;
  return ans2;
});
