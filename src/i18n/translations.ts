export type Language = 'en' | 'id';

export interface Translations {
  // Header
  platformSubtitle: string;
  switchProblem: string;
  searchPlaceholder: string;
  clear: string;
  noMatchingProblems: string;
  
  // Tabs
  learn: string;
  visualize: string;
  simulate: string;
  practice: string;
  
  // Difficulty
  easy: string;
  medium: string;
  hard: string;
  
  // Common UI
  start: string;
  stop: string;
  reset: string;
  next: string;
  previous: string;
  prev: string;
  speed: string;
  slow: string;
  fast: string;
  result: string;
  input: string;
  output: string;
  step: string;
  of: string;
  play: string;
  pause: string;
  
  // Problem-related
  algorithm: string;
  complexity: string;
  timeComplexity: string;
  spaceComplexity: string;
  example: string;
  examples: string;
  constraints: string;
  explanation: string;
  approach: string;
  solution: string;
  problemStatement: string;
  
  // Approaches
  bruteForce: string;
  twoPointers: string;
  optimalSolution: string;
  tooSlowForLargeInputs: string;
  keyInsights: string;
  
  // Visualizer/Simulator labels
  currentArea: string;
  maxArea: string;
  maxAreaFound: string;
  pointers: string;
  width: string;
  bestSoFar: string;
  digitByDigitSimulation: string;
  digitByDigitInstructions: string;
  indexExplanation: string;
  empty: string;
  oddEvenPointerSimulation: string;
  oddEvenInstructions: string;
  oddEvenColorExplanation: string;
  stepByStepSimulation: string;
  
  // Container With Most Water
  containerMoveLeft: string;
  containerMoveRight: string;
  containerComparing: string;
  containerProblemText1: string;
  containerProblemText2: string;
  containerProblemText3: string;
  containerNote: string;
  containerExplanation: string;
  containerBruteForceDesc: string;
  containerTwoPointersDesc: string;
  containerKeyInsight1: string;
  containerKeyInsight2: string;
  containerKeyInsight3: string;
  containerKeyInsight4: string;
  
  // Input Panel (Container)
  inputArrayLabel: string;
  random: string;
  presetExamples: string;
  tipContainer: string;
  presetClassic: string;
  presetSimple: string;
  presetAscending: string;
  presetDescending: string;
  presetMountain: string;
  
  // Code Editor
  runTests: string;
  running: string;
  syntaxError: string;
  testResults: string;
  passed: string;
  testCase: string;
  yourOutput: string;
  
  // Input Panel
  enterArray: string;
  enterString: string;
  enterNumber: string;
  target: string;
  capacity: string;
  limit: string;
  
  // Language switcher
  language: string;
  english: string;
  indonesian: string;
  
  // Subsets
  subsets: string;
  subsetsDesc: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    
    // Header
    platformSubtitle: 'Interactive Learning Platform for FAANG Interview Problems',
    switchProblem: 'Switch Problem',
    searchPlaceholder: 'Search title, topic, or description',
    clear: 'Clear',
    noMatchingProblems: 'No matching problems found',
    
    // Tabs
    learn: 'Learn',
    visualize: 'Visualize',
    simulate: 'Simulate',
    practice: 'Practice',
    
    // Difficulty
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Common UI
    start: 'Start',
    stop: 'Stop',
    reset: 'Reset',
    next: 'Next',
    previous: 'Previous',
    prev: 'Prev',
    speed: 'Speed',
    slow: 'Slow',
    fast: 'Fast',
    result: 'Result',
    input: 'Input',
    output: 'Output',
    step: 'Step',
    of: 'of',
    play: 'Play',
    pause: 'Pause',
    
    // Problem-related
    algorithm: 'Algorithm',
    complexity: 'Complexity',
    timeComplexity: 'Time Complexity',
    spaceComplexity: 'Space Complexity',
    example: 'Example',
    examples: 'Examples',
    constraints: 'Constraints',
    explanation: 'Explanation',
    approach: 'Approach',
    solution: 'Solution',
    problemStatement: 'Problem Statement',
    
    // Approaches
    bruteForce: 'Brute Force',
    twoPointers: 'Two Pointers',
    optimalSolution: 'Optimal solution',
    tooSlowForLargeInputs: 'Too slow for large inputs',
    keyInsights: 'Key Insights',
    
    // Visualizer/Simulator labels
    currentArea: 'Current Area',
    maxArea: 'Max Area',
    maxAreaFound: 'Max Area Found',
    pointers: 'Pointers',
    width: 'Width',
    bestSoFar: 'Best so far',
    digitByDigitSimulation: 'Digit-by-Digit Simulation',
    digitByDigitInstructions: 'Head = units digit. Play for auto-run, Skip to advance one step, Reset to restart.',
    indexExplanation: 'Index 0 = head (units digit). Light blue cell shows the digit being calculated.',
    empty: 'empty',
    oddEvenPointerSimulation: 'Odd/Even Pointer Simulation',
    oddEvenInstructions: 'Separate odd & even chains, then merge. Play/Skip/Reset to follow pointers.',
    oddEvenColorExplanation: 'Index 0 = head. Green = odd, red = even, blue = evenHead.',
    stepByStepSimulation: 'Step-by-Step Simulation',
    
    // Container With Most Water
    containerMoveLeft: 'Move left pointer (height[{0}]={1} < height[{2}]={3})',
    containerMoveRight: 'Move right pointer (height[{0}]={1} >= height[{2}]={3})',
    containerComparing: 'Comparing bars at index {0} (height={1}) and {2} (height={3})',
    containerProblemText1: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).',
    containerProblemText2: 'Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    containerProblemText3: 'Return the maximum amount of water a container can store.',
    containerNote: 'Note: You may not slant the container.',
    containerExplanation: 'Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area of water = 49 (between index 1 and 8).',
    containerBruteForceDesc: 'Check every possible pair of lines to find the maximum area.',
    containerTwoPointersDesc: 'Use two pointers at both ends and move the pointer with smaller height.',
    containerKeyInsight1: 'Area Formula: The area between two lines is determined by min(height[i], height[j]) × (j - i)',
    containerKeyInsight2: 'Why move the shorter line? The area is limited by the shorter line. Moving the taller line can only decrease the width without increasing the height limit.',
    containerKeyInsight3: 'Greedy approach works: We start with maximum width and intelligently reduce it by moving the pointer that could potentially give us a better area.',
    containerKeyInsight4: 'Common in interviews: This problem tests understanding of the two-pointer technique and greedy algorithms, frequently asked at FAANG companies.',
    
    // Input Panel (Container)
    inputArrayLabel: 'Input Array (comma-separated numbers)',
    random: 'Random',
    presetExamples: 'Preset Examples',
    tipContainer: 'Tip: Enter numbers between 1-9 for best visualization. Try different patterns to see how the algorithm adapts!',
    presetClassic: 'Classic',
    presetSimple: 'Simple',
    presetAscending: 'Ascending',
    presetDescending: 'Descending',
    presetMountain: 'Mountain',
    
    // Code Editor
    runTests: 'Run Tests',
    running: 'Running...',
    syntaxError: 'Syntax Error',
    testResults: 'Test Results',
    passed: 'Passed',
    testCase: 'Test Case',
    yourOutput: 'Your Output',
    
    // Input Panel
    enterArray: 'Enter array',
    enterString: 'Enter string',
    enterNumber: 'Enter number',
    target: 'Target',
    capacity: 'Capacity',
    limit: 'Limit',
    
    // Language switcher
    language: 'Language',
    english: 'English',
    indonesian: 'Indonesian',

    // Subsets
    subsets: 'Subsets',
    subsetsDesc: 'Generate all possible subsets (the power set).',
    
  },
  id: {
    // Header
    platformSubtitle: 'Platform Pembelajaran Interaktif untuk Soal Interview FAANG',
    switchProblem: 'Ganti Soal',
    searchPlaceholder: 'Cari judul, topik, atau deskripsi',
    clear: 'Hapus',
    noMatchingProblems: 'Tidak ada problem yang cocok',
    
    // Tabs
    learn: 'Belajar',
    visualize: 'Visualisasi',
    simulate: 'Simulasi',
    practice: 'Latihan',
    
    // Difficulty
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit',
    
    // Common UI
    start: 'Mulai',
    stop: 'Berhenti',
    reset: 'Atur Ulang',
    next: 'Berikutnya',
    previous: 'Sebelumnya',
    prev: 'Sblm',
    speed: 'Kecepatan',
    slow: 'Lambat',
    fast: 'Cepat',
    result: 'Hasil',
    input: 'Masukan',
    output: 'Keluaran',
    step: 'Langkah',
    of: 'dari',
    play: 'Putar',
    pause: 'Jeda',
    
    // Problem-related
    algorithm: 'Algoritma',
    complexity: 'Kompleksitas',
    timeComplexity: 'Kompleksitas Waktu',
    spaceComplexity: 'Kompleksitas Ruang',
    example: 'Contoh',
    examples: 'Contoh-contoh',
    constraints: 'Batasan',
    explanation: 'Penjelasan',
    approach: 'Pendekatan',
    solution: 'Solusi',
    problemStatement: 'Pernyataan Masalah',
    
    // Approaches
    bruteForce: 'Brute Force',
    twoPointers: 'Dua Pointer',
    optimalSolution: 'Solusi optimal',
    tooSlowForLargeInputs: 'Terlalu lambat untuk input besar',
    keyInsights: 'Wawasan Penting',
    
    // Visualizer/Simulator labels
    currentArea: 'Area Saat Ini',
    maxArea: 'Area Maksimum',
    maxAreaFound: 'Area Maksimum Ditemukan',
    pointers: 'Pointer',
    width: 'Lebar',
    bestSoFar: 'Terbaik sejauh ini',
    digitByDigitSimulation: 'Simulasi Digit-demi-Digit',
    digitByDigitInstructions: 'Head = satuan. Play untuk auto-jalan, Skip untuk maju satu langkah, Reset untuk ulang.',
    indexExplanation: 'Index 0 = head (satuan). Sel biru muda menunjukkan digit yang sedang dihitung.',
    empty: 'kosong',
    oddEvenPointerSimulation: 'Simulasi Odd/Even Pointer',
    oddEvenInstructions: 'Pisahkan rantai ganjil & genap, lalu gabungkan. Play/Skip/Reset untuk mengikuti pointer.',
    oddEvenColorExplanation: 'Index 0 = head. Warna hijau = odd, merah = even, biru = evenHead.',
    stepByStepSimulation: 'Simulasi Step-by-Step',
    
    // Container With Most Water
    containerMoveLeft: 'Gerakkan pointer kiri (tinggi[{0}]={1} < tinggi[{2}]={3})',
    containerMoveRight: 'Gerakkan pointer kanan (tinggi[{0}]={1} >= tinggi[{2}]={3})',
    containerComparing: 'Membandingkan batang pada indeks {0} (tinggi={1}) dan {2} (tinggi={3})',
    containerProblemText1: 'Anda diberikan array integer height dengan panjang n. Terdapat n garis vertikal yang ditarik sedemikian rupa sehingga dua titik ujung garis ke-i adalah (i, 0) dan (i, height[i]).',
    containerProblemText2: 'Temukan dua garis yang bersama dengan sumbu x membentuk wadah, sedemikian rupa sehingga wadah tersebut menampung air paling banyak.',
    containerProblemText3: 'Kembalikan jumlah air maksimum yang dapat ditampung wadah.',
    containerNote: 'Catatan: Anda tidak boleh memiringkan wadah.',
    containerExplanation: 'Penjelasan: Garis vertikal diwakili oleh array [1,8,6,2,5,4,8,3,7]. Area air maksimum = 49 (antara indeks 1 dan 8).',
    containerBruteForceDesc: 'Periksa setiap kemungkinan pasangan garis untuk menemukan area maksimum.',
    containerTwoPointersDesc: 'Gunakan dua pointer di kedua ujung dan gerakkan pointer dengan tinggi yang lebih kecil.',
    containerKeyInsight1: 'Rumus Area: Area antara dua garis ditentukan oleh min(height[i], height[j]) × (j - i)',
    containerKeyInsight2: 'Mengapa menggerakkan garis yang lebih pendek? Area dibatasi oleh garis yang lebih pendek. Menggerakkan garis yang lebih tinggi hanya akan mengurangi lebar tanpa meningkatkan batas tinggi.',
    containerKeyInsight3: 'Pendekatan Greedy berhasil: Kita mulai dengan lebar maksimum dan secara cerdas menguranginya dengan menggerakkan pointer yang berpotensi memberikan area yang lebih baik.',
    containerKeyInsight4: 'Umum dalam wawancara: Masalah ini menguji pemahaman tentang teknik dua pointer dan algoritma greedy, sering ditanyakan di perusahaan FAANG.',
    
    // Input Panel (Container)
    inputArrayLabel: 'Array Masukan (angka dipisahkan koma)',
    random: 'Acak',
    presetExamples: 'Contoh Preset',
    tipContainer: 'Tip: Masukkan angka antara 1-9 untuk visualisasi terbaik. Coba pola berbeda untuk melihat bagaimana algoritma beradaptasi!',
    presetClassic: 'Klasik',
    presetSimple: 'Sederhana',
    presetAscending: 'Menaik',
    presetDescending: 'Menurun',
    presetMountain: 'Gunung',
    
    // Code Editor
    runTests: 'Jalankan Tes',
    running: 'Sedang Berjalan...',
    syntaxError: 'Kesalahan Sintaks',
    testResults: 'Hasil Tes',
    passed: 'Lolos',
    testCase: 'Kasus Tes',
    yourOutput: 'Keluaran Anda',
    
    // Input Panel
    enterArray: 'Masukkan array',
    enterString: 'Masukkan string',
    enterNumber: 'Masukkan angka',
    target: 'Target',
    capacity: 'Kapasitas',
    limit: 'Batas',
    
    // Language switcher
    language: 'Bahasa',
    english: 'Inggris',
    indonesian: 'Indonesia',

    // Subsets
    subsets: 'Subsets',
    subsetsDesc: 'Hasilkan semua subset yang mungkin (himpunan kuasa).',
  },
};
