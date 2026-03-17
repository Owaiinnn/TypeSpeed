export interface CodeSnippet {
  text: string;
  language: string;
  difficulty: "easy" | "medium" | "hard";
}

export const snippets: CodeSnippet[] = [
  // ─── EASY: JavaScript ───────────────────────────────────
  {
    text: `const greeting = "Hello, World!";\nconsole.log(greeting);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `let sum = 0;\nfor (let i = 0; i < 10; i++) {\n  sum += i;\n}\nreturn sum;`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const items = [1, 2, 3, 4, 5];\nconst doubled = items.map(x => x * 2);\nconsole.log(doubled);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const name = "Alice";\nconst age = 30;\nconsole.log(\`\${name} is \${age}\`);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const nums = [3, 1, 4, 1, 5];\nnums.sort((a, b) => a - b);\nconsole.log(nums);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const obj = { x: 1, y: 2 };\nconst { x, y } = obj;\nconsole.log(x + y);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const arr = [1, 2, 3];\nconst copy = [...arr, 4, 5];\nconsole.log(copy);`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const colors = ["red", "green", "blue"];\ncolors.forEach(c => console.log(c));`,
    language: "JavaScript",
    difficulty: "easy",
  },
  {
    text: `const isEven = n => n % 2 === 0;\nconst evens = [1,2,3,4,5].filter(isEven);\nconsole.log(evens);`,
    language: "JavaScript",
    difficulty: "easy",
  },

  // ─── EASY: TypeScript ───────────────────────────────────
  {
    text: `if (user.isActive) {\n  sendEmail(user.email);\n} else {\n  logInactiveUser(user.id);\n}`,
    language: "TypeScript",
    difficulty: "easy",
  },
  {
    text: `interface Point {\n  x: number;\n  y: number;\n}`,
    language: "TypeScript",
    difficulty: "easy",
  },
  {
    text: `type Status = "active" | "inactive";\nconst s: Status = "active";`,
    language: "TypeScript",
    difficulty: "easy",
  },
  {
    text: `const greet = (name: string): string => {\n  return \`Hello, \${name}!\`;\n};`,
    language: "TypeScript",
    difficulty: "easy",
  },

  // ─── EASY: Python ───────────────────────────────────────
  {
    text: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `numbers = [1, 2, 3, 4, 5]\nresult = [n ** 2 for n in numbers]\nprint(result)`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `for i in range(10):\n    if i % 2 == 0:\n        print(f"{i} is even")`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `name = input("Name: ")\nprint(f"Hello, {name}!")`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit.upper())`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `d = {"a": 1, "b": 2, "c": 3}\nfor k, v in d.items():\n    print(f"{k}: {v}")`,
    language: "Python",
    difficulty: "easy",
  },
  {
    text: `x = [1, 2, 3]\ny = [4, 5, 6]\nzipped = list(zip(x, y))\nprint(zipped)`,
    language: "Python",
    difficulty: "easy",
  },

  // ─── EASY: Rust ─────────────────────────────────────────
  {
    text: `fn main() {\n    let x = 5;\n    println!("The value is: {x}");\n}`,
    language: "Rust",
    difficulty: "easy",
  },
  {
    text: `let mut v = vec![1, 2, 3];\nv.push(4);\nprintln!("{:?}", v);`,
    language: "Rust",
    difficulty: "easy",
  },
  {
    text: `let s = String::from("hello");\nlet len = s.len();\nprintln!("{len}");`,
    language: "Rust",
    difficulty: "easy",
  },

  // ─── EASY: Go ───────────────────────────────────────────
  {
    text: `func main() {\n    fmt.Println("Hello, World!")\n}`,
    language: "Go",
    difficulty: "easy",
  },
  {
    text: `nums := []int{1, 2, 3, 4, 5}\nfor _, n := range nums {\n    fmt.Println(n)\n}`,
    language: "Go",
    difficulty: "easy",
  },
  {
    text: `name := "Go"\nmsg := fmt.Sprintf("Hello, %s!", name)\nfmt.Println(msg)`,
    language: "Go",
    difficulty: "easy",
  },

  // ─── EASY: Java ─────────────────────────────────────────
  {
    text: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello!");\n  }\n}`,
    language: "Java",
    difficulty: "easy",
  },
  {
    text: `int[] nums = {1, 2, 3, 4, 5};\nfor (int n : nums) {\n  System.out.println(n);\n}`,
    language: "Java",
    difficulty: "easy",
  },

  // ─── EASY: C ────────────────────────────────────────────
  {
    text: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    language: "C",
    difficulty: "easy",
  },

  // ─── EASY: Ruby ─────────────────────────────────────────
  {
    text: `3.times do |i|\n  puts "Count: #{i}"\nend`,
    language: "Ruby",
    difficulty: "easy",
  },
  {
    text: `arr = [1, 2, 3, 4, 5]\nputs arr.select(&:even?)`,
    language: "Ruby",
    difficulty: "easy",
  },

  // ─── EASY: Swift ────────────────────────────────────────
  {
    text: `let names = ["Alice", "Bob", "Charlie"]\nfor name in names {\n    print("Hello, \\(name)!")\n}`,
    language: "Swift",
    difficulty: "easy",
  },

  // ─── EASY: Kotlin ───────────────────────────────────────
  {
    text: `val items = listOf("a", "b", "c")\nitems.forEach { println(it) }`,
    language: "Kotlin",
    difficulty: "easy",
  },

  // ─── MEDIUM: TypeScript ─────────────────────────────────
  {
    text: `function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `const fetchData = async (url: string) => {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error("Fetch failed:", err);\n    throw err;\n  }\n};`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `const debounce = (fn: Function, ms: number) => {\n  let timer: NodeJS.Timeout;\n  return (...args: any[]) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n};`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `app.get("/api/users/:id", async (req, res) => {\n  try {\n    const user = await db.users.findById(req.params.id);\n    if (!user) {\n      return res.status(404).json({ error: "Not found" });\n    }\n    res.json(user);\n  } catch (err) {\n    res.status(500).json({ error: "Server error" });\n  }\n});`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {\n  return arr.reduce((acc, item) => {\n    const k = String(item[key]);\n    (acc[k] = acc[k] || []).push(item);\n    return acc;\n  }, {} as Record<string, T[]>);\n}`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `const throttle = (fn: Function, limit: number) => {\n  let lastCall = 0;\n  return (...args: any[]) => {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n};`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `function retry<T>(fn: () => Promise<T>, n: number): Promise<T> {\n  return fn().catch((err) => {\n    if (n <= 1) throw err;\n    return retry(fn, n - 1);\n  });\n}`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `class LinkedList<T> {\n  head: Node<T> | null = null;\n\n  push(value: T): void {\n    const node = { value, next: this.head };\n    this.head = node;\n  }\n\n  pop(): T | undefined {\n    if (!this.head) return undefined;\n    const val = this.head.value;\n    this.head = this.head.next;\n    return val;\n  }\n}`,
    language: "TypeScript",
    difficulty: "medium",
  },
  {
    text: `const memoize = <T extends (...args: any[]) => any>(fn: T): T => {\n  const cache = new Map<string, ReturnType<T>>();\n  return ((...args: any[]) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key)!;\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  }) as T;\n};`,
    language: "TypeScript",
    difficulty: "medium",
  },

  // ─── MEDIUM: JavaScript ─────────────────────────────────
  {
    text: `function deepClone(obj) {\n  if (obj === null || typeof obj !== "object") {\n    return obj;\n  }\n  const clone = Array.isArray(obj) ? [] : {};\n  for (const key in obj) {\n    clone[key] = deepClone(obj[key]);\n  }\n  return clone;\n}`,
    language: "JavaScript",
    difficulty: "medium",
  },
  {
    text: `function flattenArray(arr) {\n  return arr.reduce((flat, item) => {\n    return flat.concat(\n      Array.isArray(item) ? flattenArray(item) : item\n    );\n  }, []);\n}`,
    language: "JavaScript",
    difficulty: "medium",
  },
  {
    text: `class EventBus {\n  constructor() {\n    this.events = {};\n  }\n  on(event, callback) {\n    (this.events[event] ||= []).push(callback);\n  }\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(cb => cb(...args));\n  }\n}`,
    language: "JavaScript",
    difficulty: "medium",
  },

  // ─── MEDIUM: Python ─────────────────────────────────────
  {
    text: `class Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n        raise IndexError("Stack is empty")\n\n    def is_empty(self):\n        return len(self.items) == 0`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `def flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `from collections import Counter\n\ndef most_common_words(text, n=5):\n    words = text.lower().split()\n    counter = Counter(words)\n    return counter.most_common(n)`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `class Queue:\n    def __init__(self):\n        self.items = []\n\n    def enqueue(self, item):\n        self.items.insert(0, item)\n\n    def dequeue(self):\n        return self.items.pop()\n\n    def size(self):\n        return len(self.items)`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `@dataclass\nclass User:\n    name: str\n    email: str\n    age: int = 0\n\n    def greet(self) -> str:\n        return f"Hi, I'm {self.name}!"`,
    language: "Python",
    difficulty: "medium",
  },
  {
    text: `def chunk(lst, size):\n    return [\n        lst[i:i + size]\n        for i in range(0, len(lst), size)\n    ]`,
    language: "Python",
    difficulty: "medium",
  },

  // ─── MEDIUM: Rust ───────────────────────────────────────
  {
    text: `impl Iterator for Counter {\n    type Item = u32;\n\n    fn next(&mut self) -> Option<Self::Item> {\n        if self.count < 5 {\n            self.count += 1;\n            Some(self.count)\n        } else {\n            None\n        }\n    }\n}`,
    language: "Rust",
    difficulty: "medium",
  },
  {
    text: `fn fibonacci(n: u32) -> u64 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}`,
    language: "Rust",
    difficulty: "medium",
  },
  {
    text: `fn count_words(text: &str) -> HashMap<&str, usize> {\n    let mut map = HashMap::new();\n    for word in text.split_whitespace() {\n        *map.entry(word).or_insert(0) += 1;\n    }\n    map\n}`,
    language: "Rust",
    difficulty: "medium",
  },
  {
    text: `enum Shape {\n    Circle(f64),\n    Rectangle(f64, f64),\n}\n\nfn area(shape: &Shape) -> f64 {\n    match shape {\n        Shape::Circle(r) => std::f64::consts::PI * r * r,\n        Shape::Rectangle(w, h) => w * h,\n    }\n}`,
    language: "Rust",
    difficulty: "medium",
  },

  // ─── MEDIUM: Go ─────────────────────────────────────────
  {
    text: `func reverse(s string) string {\n    runes := []rune(s)\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}`,
    language: "Go",
    difficulty: "medium",
  },
  {
    text: `func fibonacci(n int) int {\n    if n <= 1 {\n        return n\n    }\n    return fibonacci(n-1) + fibonacci(n-2)\n}`,
    language: "Go",
    difficulty: "medium",
  },
  {
    text: `func contains(slice []string, item string) bool {\n    for _, s := range slice {\n        if s == item {\n            return true\n        }\n    }\n    return false\n}`,
    language: "Go",
    difficulty: "medium",
  },
  {
    text: `func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf("worker %d processing %d\\n", id, j)\n        results <- j * 2\n    }\n}`,
    language: "Go",
    difficulty: "medium",
  },

  // ─── MEDIUM: Java ───────────────────────────────────────
  {
    text: `public static int binarySearch(int[] arr, int target) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    language: "Java",
    difficulty: "medium",
  },
  {
    text: `public static <T> List<T> filter(List<T> list, Predicate<T> p) {\n    List<T> result = new ArrayList<>();\n    for (T item : list) {\n        if (p.test(item)) {\n            result.add(item);\n        }\n    }\n    return result;\n}`,
    language: "Java",
    difficulty: "medium",
  },

  // ─── MEDIUM: Ruby ───────────────────────────────────────
  {
    text: `class Dog\n  attr_reader :name, :breed\n\n  def initialize(name, breed)\n    @name = name\n    @breed = breed\n  end\n\n  def bark\n    "#{@name} says Woof!"\n  end\nend`,
    language: "Ruby",
    difficulty: "medium",
  },

  // ─── MEDIUM: Swift ──────────────────────────────────────
  {
    text: `func quickSort(_ array: [Int]) -> [Int] {\n    guard array.count > 1 else { return array }\n    let pivot = array[array.count / 2]\n    let less = array.filter { $0 < pivot }\n    let equal = array.filter { $0 == pivot }\n    let greater = array.filter { $0 > pivot }\n    return quickSort(less) + equal + quickSort(greater)\n}`,
    language: "Swift",
    difficulty: "medium",
  },

  // ─── MEDIUM: C ──────────────────────────────────────────
  {
    text: `void bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int tmp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = tmp;\n            }\n        }\n    }\n}`,
    language: "C",
    difficulty: "medium",
  },

  // ─── HARD: TypeScript ───────────────────────────────────
  {
    text: `type DeepPartial<T> = T extends object ? {\n  [P in keyof T]?: DeepPartial<T[P]>;\n} : T;\n\nfunction mergeDeep<T extends object>(\n  target: T,\n  source: DeepPartial<T>\n): T {\n  const output = { ...target };\n  for (const key of Object.keys(source) as (keyof T)[]) {\n    if (source[key] instanceof Object && key in target) {\n      output[key] = mergeDeep(\n        target[key] as any,\n        source[key] as any\n      );\n    } else {\n      (output as any)[key] = source[key];\n    }\n  }\n  return output;\n}`,
    language: "TypeScript",
    difficulty: "hard",
  },
  {
    text: `class EventEmitter<T extends Record<string, any>> {\n  private listeners = new Map<keyof T, Set<Function>>();\n\n  on<K extends keyof T>(event: K, fn: (data: T[K]) => void) {\n    if (!this.listeners.has(event)) {\n      this.listeners.set(event, new Set());\n    }\n    this.listeners.get(event)!.add(fn);\n    return () => this.listeners.get(event)?.delete(fn);\n  }\n\n  emit<K extends keyof T>(event: K, data: T[K]): void {\n    this.listeners.get(event)?.forEach(fn => fn(data));\n  }\n}`,
    language: "TypeScript",
    difficulty: "hard",
  },
  {
    text: `async function* paginate<T>(\n  fetchPage: (cursor?: string) => Promise<{\n    data: T[];\n    next?: string;\n  }>\n) {\n  let cursor: string | undefined;\n  do {\n    const { data, next } = await fetchPage(cursor);\n    for (const item of data) {\n      yield item;\n    }\n    cursor = next;\n  } while (cursor);\n}`,
    language: "TypeScript",
    difficulty: "hard",
  },
  {
    text: `type Prettify<T> = {\n  [K in keyof T]: T[K];\n} & {};\n\ntype Merge<A, B> = Prettify<\n  Omit<A, keyof B> & B\n>;\n\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? DeepReadonly<T[K]>\n    : T[K];\n};`,
    language: "TypeScript",
    difficulty: "hard",
  },
  {
    text: `function createStore<S>(initialState: S) {\n  let state = initialState;\n  const listeners = new Set<(s: S) => void>();\n\n  return {\n    getState: () => state,\n    setState: (next: Partial<S>) => {\n      state = { ...state, ...next };\n      listeners.forEach(fn => fn(state));\n    },\n    subscribe: (fn: (s: S) => void) => {\n      listeners.add(fn);\n      return () => listeners.delete(fn);\n    },\n  };\n}`,
    language: "TypeScript",
    difficulty: "hard",
  },

  // ─── HARD: Python ───────────────────────────────────────
  {
    text: `def lru_cache(maxsize=128):\n    def decorator(func):\n        cache = OrderedDict()\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            key = (args, tuple(sorted(kwargs.items())))\n            if key in cache:\n                cache.move_to_end(key)\n                return cache[key]\n            result = func(*args, **kwargs)\n            cache[key] = result\n            if len(cache) > maxsize:\n                cache.popitem(last=False)\n            return result\n        return wrapper\n    return decorator`,
    language: "Python",
    difficulty: "hard",
  },
  {
    text: `class BinaryTree:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\n    def insert(self, val):\n        if val < self.value:\n            if self.left:\n                self.left.insert(val)\n            else:\n                self.left = BinaryTree(val)\n        else:\n            if self.right:\n                self.right.insert(val)\n            else:\n                self.right = BinaryTree(val)`,
    language: "Python",
    difficulty: "hard",
  },
  {
    text: `async def gather_with_limit(coros, limit):\n    semaphore = asyncio.Semaphore(limit)\n\n    async def limited(coro):\n        async with semaphore:\n            return await coro\n\n    return await asyncio.gather(\n        *(limited(c) for c in coros)\n    )`,
    language: "Python",
    difficulty: "hard",
  },
  {
    text: `class Singleton(type):\n    _instances = {}\n\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(\n                *args, **kwargs\n            )\n        return cls._instances[cls]`,
    language: "Python",
    difficulty: "hard",
  },

  // ─── HARD: Rust ─────────────────────────────────────────
  {
    text: `use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn parallel_sum(data: &[i32], num_threads: usize) -> i32 {\n    let chunk_size = (data.len() + num_threads - 1) / num_threads;\n    let result = Arc::new(Mutex::new(0));\n    let mut handles = vec![];\n\n    for chunk in data.chunks(chunk_size) {\n        let chunk = chunk.to_vec();\n        let result = Arc::clone(&result);\n        handles.push(thread::spawn(move || {\n            let sum: i32 = chunk.iter().sum();\n            *result.lock().unwrap() += sum;\n        }));\n    }\n\n    for h in handles {\n        h.join().unwrap();\n    }\n    *result.lock().unwrap()\n}`,
    language: "Rust",
    difficulty: "hard",
  },
  {
    text: `trait Summary {\n    fn summarize(&self) -> String;\n    fn preview(&self) -> String {\n        format!("{}...", &self.summarize()[..20])\n    }\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!("{} by {}", self.title, self.author)\n    }\n}`,
    language: "Rust",
    difficulty: "hard",
  },

  // ─── HARD: Go ───────────────────────────────────────────
  {
    text: `func mergeSort(arr []int) []int {\n    if len(arr) <= 1 {\n        return arr\n    }\n    mid := len(arr) / 2\n    left := mergeSort(arr[:mid])\n    right := mergeSort(arr[mid:])\n    return merge(left, right)\n}\n\nfunc merge(a, b []int) []int {\n    result := make([]int, 0, len(a)+len(b))\n    i, j := 0, 0\n    for i < len(a) && j < len(b) {\n        if a[i] <= b[j] {\n            result = append(result, a[i])\n            i++\n        } else {\n            result = append(result, b[j])\n            j++\n        }\n    }\n    result = append(result, a[i:]...)\n    result = append(result, b[j:]...)\n    return result\n}`,
    language: "Go",
    difficulty: "hard",
  },
  {
    text: `type Cache struct {\n    mu    sync.RWMutex\n    items map[string]cacheItem\n}\n\ntype cacheItem struct {\n    value     interface{}\n    expiresAt time.Time\n}\n\nfunc (c *Cache) Get(key string) (interface{}, bool) {\n    c.mu.RLock()\n    defer c.mu.RUnlock()\n    item, ok := c.items[key]\n    if !ok || time.Now().After(item.expiresAt) {\n        return nil, false\n    }\n    return item.value, true\n}`,
    language: "Go",
    difficulty: "hard",
  },

  // ─── HARD: Java ─────────────────────────────────────────
  {
    text: `public class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> e) {\n        return size() > capacity;\n    }\n}`,
    language: "Java",
    difficulty: "hard",
  },

  // ─── HARD: C ────────────────────────────────────────────
  {
    text: `typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\n\nNode* reverse(Node* head) {\n    Node* prev = NULL;\n    Node* curr = head;\n    while (curr != NULL) {\n        Node* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
    language: "C",
    difficulty: "hard",
  },
];

export function getRandomSnippet(difficulty?: CodeSnippet["difficulty"]): CodeSnippet {
  const filtered = difficulty
    ? snippets.filter((s) => s.difficulty === difficulty)
    : snippets;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
