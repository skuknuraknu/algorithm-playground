# Data Structures & Algorithms Learning Platform - Architecture

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/              # Reusable UI components
│   │   ├── TabButton.tsx
│   │   ├── CallToAction.tsx
│   │   ├── TabContentWrapper.tsx
│   │   └── ProblemCard.tsx
│   ├── ProblemContent.tsx   # Unified problem content renderer
│   ├── [problem-name]/      # Problem-specific components
│   │   ├── [Problem]Explanation.tsx
│   │   ├── [Problem]InputPanel.tsx
│   │   ├── [Problem]Visualizer.tsx
│   │   ├── [Problem]Simulator.tsx
│   │   └── [Problem]CodeEditor.tsx
├── config/
│   ├── problemComponents.tsx # Component mapping for all problems
│   └── problemIcons.ts       # Icon mapping for all problems
├── hooks/
│   └── useProblemStates.ts   # Centralized state management
├── types/
│   └── Problem.ts             # Problem types and configurations
└── App.tsx                    # Main application
```

## 🎨 Theme System

Each problem has a consistent theme defined in \`types/Problem.ts\`:

### Current Problem Themes:

1. **Container Water**: Blue → Cyan
2. **Mountain Array**: Green → Emerald
3. **Boats**: Indigo → Purple
4. **Move Zeroes**: Teal → Cyan
5. **Longest Substring**: Pink → Rose
6. **Find Position**: Violet → Purple
7. **First Bad Version**: Orange → Red
8. **Missing Number**: Purple → Pink
9. **Count Primes**: Amber → Orange

## 🔧 Adding a New Problem - Quick Guide

1. **Define in types/Problem.ts** - Add problem config with theme
2. **Add icon in config/problemIcons.ts** - Choose Lucide icon
3. **Create 5 components** - Explanation, InputPanel, Visualizer, Simulator, CodeEditor
4. **Register in config/problemComponents.tsx** - Map components
5. **Add state in hooks/useProblemStates.ts** - Initialize state
6. **Update App.tsx** - Add input panel and content rendering

## 📦 Reusable Components

- **TabButton**: Standard tab with consistent styling
- **CallToAction**: Motivational CTA with gradient
- **TabContentWrapper**: Consistent tab content container
- **ProblemCard**: Problem selection card
- **ProblemContent**: Unified content renderer

## 🎯 Design Principles

1. **Consistency**: Same visual language across problems
2. **Scalability**: Easy to add new problems
3. **Maintainability**: Centralized config and shared components
4. **Type Safety**: Full TypeScript support
5. **Separation of Concerns**: Clear component responsibilities

## 📊 Current Statistics

- **Total Problems**: 9
- **Easy**: 5 | **Medium**: 4 | **Hard**: 0
- **Total Components**: 45+ components
- **Shared Components**: 5
- **Lines of Code**: ~8000+ lines
