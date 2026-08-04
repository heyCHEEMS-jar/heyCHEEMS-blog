---
title: 常用算法模板 Java/JS
permalink: 常用算法模板_Java/JS
published: 2026-02-04
tags: [Java, JavaScript]
category: 数据结构与算法
licenseName: "CC BY 4.0"
draft: false
date: 2026-02-04
---

更新于 2026.7.24

## 快速排序

Java

```java
static void quickSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int left = l, right = r, pivot = arr[l];
    while (l < r) {
    	// 以arr[l]为基准点,l元素<=基准点,r元素>=基准点
    	while (l < r && arr[r] >= pivot) r--;
    	while (l < r && arr[l] <= pivot) l++;
    	if (l < r) swap(arr, l, r); // 两指针未相遇则交换元素确保继续移动至相遇
    }
    swap(arr, l, left); // 两指针相遇所在元素一定比基准点小(因为先移动的r指针),与基准点进行交换
    quickSort(arr, left, l - 1);
    quickSort(arr, r + 1, right);
}
static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

<br>

JavaScript

```javascript
const quickSort = (arr, l, r) => {
    if (l >= r) return
    const left = l, right = r, pivot = arr[l]
    while (l < r) {
        while (l < r && arr[r] >= pivot) r--
        while (l < r && arr[l] <= pivot) l++
        if (l < r) [arr[l], arr[r]] = [arr[r], arr[l]]
    }
    [arr[left], arr[l]] = [arr[l], arr[left]]
    quickSort(arr, left, l - 1)
    quickSort(arr, l + 1, right)
}
```

## 归并排序

Java

```java
// 归并排序数组的[l, r)区间
static void mergeSort(int[] arr, int l, int r) {
    if (r - l <= 1) return; // 一直拆分到只剩最后一个元素
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid); // 拆分左半边
    mergeSort(arr, mid, r); // 拆分右半边
    merge(arr, l, r); // 合并两边
}
static void merge(int[] arr, int l, int r) {
    int[] tmp = new int[r - l];
    int mid = l + (r - l) / 2;
    int i = l, j = mid, k = 0;
    while (i < mid && j < r) {
        if (arr[i] < arr[j]) {
            tmp[k++] = arr[i++]; 
        } else {
            tmp[k++] = arr[j++];
            // 可选,累加逆序对数量
            count += mid - i; // 左半边剩余元素与当前元素构成逆序对
        }
    }
    // 补上剩余元素
    while (i < mid) tmp[k++] = arr[i++];
    while (j < r) tmp[k++] = arr[j++];
    System.arraycopy(tmp, 0, arr, l, tmp.length);
}
```

<br>

JavaScript

```javascript
const mergeSort = (arr, l, r) => {
  if (r - l <= 1) return
  const mid = Math.floor(l + (r - l) / 2)
  mergeSort(arr, l, mid)
  mergeSort(arr, mid, r)
  merge(arr, l, r)
}
const merge = (arr, l, r) => {
  const tmp = []
  const mid = Math.floor(l + (r - l) / 2)
  let i = l, j = mid
  while (i < mid && j < r) {
    if (arr[i] < arr[j]) {
        tmp.push(arr[i++])
    } else {
        tmp.push(arr[j++])
    }
  }
  while (i < mid) tmp.push(arr[i++])
  while (j < r) tmp.push(arr[j++])
  arr.splice(l, tmp.length, ...tmp)
}
```



## 质数筛

### 埃氏筛

``` java
boolean[] isPrime = new boolean[n + 1];
Arrays.fill(isPrime, true);	
isPrime[0] = isPrime[1] = false;
for (int i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
        for (int j = i * i; j <= n; j += i) {
            isPrime[j] = false;
        }
    }
}
```

###  欧拉筛

``` java
boolean[] isPrime = new boolean[n + 1];
int[] primes = new int[n];
int count = 0;
Arrays.fill(isPrime, true);
isPrime[0] = isPrime[1] = false;
for (int i = 2; i <= n; i++) {
    if (isPrime[i]) primes[count++] = i;
    for (int j = 0; j < count && i * primes[j] <= n; j++) {
        isPrime[i * primes[j]] = false;
        if (i % primes[j] == 0) break;
    }
}
```



## 快速幂

```java
// 快速计算a^b % MOD
static long fastPow(long a, long b, long MOD) {
    long res = 1;
    while (b > 0) {
        if ((b & 1) == 1) {
            res = res * a % MOD;
        }
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}
```

### 费马小定理计算逆元

前提条件：MOD 为质数，且 a 不被 MOD 整除

a 在模下的逆元为 a^(MOD - 2) % MOD	

```java
// 直接除法取模 b/a%MOD 会丢失精度，除以a等价于乘a在模下的逆元 => b * a^(MOD-2) % MOD
static long calc(long a, long MOD) {
    return fastPow(a, MOD - 2, MOD); // 结果为逆元
}
```



## 最大公约数GCD和最小公倍数LCM

```java
static long gcd(long a, long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
static long lcm(long a, long b) {
    return a / gcd(a, b) * b; // 先除后乘防溢出
}
```



## 前缀和

``` java
int[] sum = new int[n + 1];
for (int i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + arr[i];
}
// 求区间 [l, r] 的和
int rangeSum = sum[r] - sum[l - 1];
```

## 差分

```java
int[] diff = new int[n + 1];
diff[0] = arr[0];
// 构建差分数组
for (int i = 1; i < n; i++) {
    diff[i] = arr[i] - arr[i - 1];
}
// 区间增值 [l, r] + val
void add(int l, int r, int val) {
    diff[l] += val;
    diff[r + 1] -= val;
}
// 还原数组
for (int i = 0; i < n; i++) {
    if (i == 0) arr[i] = diff[i];
    else arr[i] = arr[i - 1] + diff[i];
}
```



## 最短路径

### Dijkstra (堆优化版 适合稀疏图)

适用于单源最短路径

``` java
// g为邻接表，int[]为{v, w}，s为起点
static int[] dijkstra(List<int[]>[] g, int n, int s) {
    int[] dist = new int[n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    Arrays.fill(dist, Integer.MAX_VALUE); 
    dist[s] = 0; // 起点到自身距离为0
    pq.offer(new int[] {s, 0});  // 起点入队
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int v = cur[0], w = cur[1];
        if (w != dist[v]) continue; // 跳过已更新节点
        // 找到新的最近点连接
        for (int[] e : g[v]) { 
            int newDist = dist[v] + e[1];
            if (newDist < dist[e[0]]) {
                dist[e[0]] = newDist; // 更新起点到目标点的最短距离
                pq.offer(new int[] {e[0], newDist});
            }
        }
    }
    return dist;
}
```

### Dijkstra (朴素版 适合稠密图)

适用于单源最短路径

``` java
// g为邻接矩阵 int[n][n]，dist不可达值设为 MAX_VALUE，s为起点
static int[] dijkstra(int[][] g, int n, int s) {
    boolean[] visited = new boolean[n];
    int[] dist = new int[n]; // 起点到各点的距离
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[s] = 0; // 起点自身距离为0
    for (int i = 0; i < n; i++) {
        int u = -1, min = Integer.MAX_VALUE;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && dist[j] < min) {
                min = dist[j];
                u = j;
            }
        }
        if (u == -1) break;
        visited[u] = true; // 标记为已访问
        // 更新当前节点周围
        for (int v = 0; v < n; v++) {
            if (visited[v] || g[u][v] == Integer.MAX_VALUE) continue;
            int newDist = dist[u] + g[u][v];
            if (newDist < dist[v]) {
                dist[v] = newDist; // 更新起点到目标点的最短路径
            }
        }
    }
    return dist;
}
```

### Floyd

适用于多源最短路径

``` java
// g为邻接矩阵
static void floyd(int[][] g, int n) {
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            if (g[i][k] == Integer.MAX_VALUE) continue; // 前半段是否可达
            for (int j = 0; j < n; j++) {
                if (g[k][j] == Integer.MAX_VALUE) continue; // 后半段是否可达
                int newDist = g[i][k] + g[k][j];
                if (newDist < g[i][j]) {
                    g[i][j] = newDist;
                }
            }
        }
    }
}
```



## 最小生成树

### Kruskal

```java
// edges: [u, v, w]
static int kruskal(int n, int[][] edges) {
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);
    int sum = 0, count = 0;
    for (int[] e : edges) {
        // 根节点不同 => 不会连成环，可以合并
        if (find(e[0]) != find(e[1])) {
            union(e[0], e[1]);
            sum += e[2];
            if (++count == n - 1) break;
        }
    }
    return count == n - 1 ? sum : -1;
}
```

#### 并查集

```java
int[] p = new int[n + 1]; // 根节点负值取绝对值表示树高度
// 初始化每个节点都是根，初始高度为1
for (int i = 0; i <= n; i++) p[i] = -1;

// 查找根节点
static int find(int x) {
    if (p[x] < 0) return x;
    return p[x] = find(p[x]); // 扁平化子节点
}
// 合并
static void union(int x, int y) {
    int rx = find(x);
    int ry = find(y);
    if (rx == ry) return;
    if (p[rx] < p[ry]) {
        p[ry] = rx;
    } else if (p[rx] > p[ry]) {
        p[rx] = ry;
    } else {
        p[rx] = ry;
        p[ry]--; // 两树高度相同，合并高度+1（一个根指向另一个根）
    }
}
```

### Prim (堆优化版 适合稀疏图)

```java
// g为邻接表 int[]为{v, w}
static int prim(List<int[]>[] g, int n) {
    boolean[] visited = new boolean[n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1] - b[1]);
    pq.offer(new int[]{0, 0}); // 生成树起点
    int sum = 0, count = 0;
    while (!pq.isEmpty() && count < n) {
        int[] cur = pq.poll();
        int v = cur[0], w = cur[1];
        if (visited[v]) continue;
        visited[v] = true;
        sum += w;
        count++;
        // 更新生成树周围
        for (int[] e : g[v]) { 
            if (!visited[e[0]]) pq.offer(e);
        }
    }
    return count == n ? sum : -1;
}
```

### Prim (朴素版 适合稠密图)

```java
// g为邻接矩阵 int[n][n]，dist不可达值设为 MAX_VALUE
static int prim(int[][] g, int n) {
    boolean[] visited = new boolean[n];
    int[] dist = new int[n]; // 当前生成树到各点的距离
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[0] = 0; // 生成树起点距离为0
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int u = -1, min = Integer.MAX_VALUE;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && dist[j] < min) {
                min = dist[j];
                u = j;
            }
        }
        if (u == -1) return -1;
        // 找到了新的最近点，更新状态
        visited[u] = true;
        sum += dist[u];
        // 更新生成树周围
        for (int v = 0; v < n; v++) {
            if (!visited[v] && g[u][v] < dist[v]) {
                dist[v] = g[u][v];
            }
        }
    }
    return sum;
}
```

持续收集中...

