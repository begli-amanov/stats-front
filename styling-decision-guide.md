# Styling Decision Guide: When to Use What

## Quick Decision Tree

```
Is it a reusable component with multiple variants?
├── YES → Use CVA
└── NO → Continue below

Does it need complex animations, pseudo-selectors, or calculations?
├── YES → Use CSS Modules
└── NO → Continue below

Is it simple styling (spacing, colors, basic layout)?
├── YES → Use Tailwind utilities
└── NO → Combination approach
```

## 1. Tailwind Utility Classes - Your Default Choice

### ✅ **USE FOR:**

- **Layout & Spacing**: `flex`, `grid`, `p-4`, `mx-auto`, `space-y-2`
- **Colors & Typography**: `text-blue-500`, `bg-white`, `font-semibold`
- **Responsive Design**: `md:flex-row`, `lg:text-xl`
- **Simple States**: `hover:bg-gray-100`, `focus:ring-2`
- **Quick Prototyping**: Rapid iteration and testing

### ✅ **EXAMPLE SCENARIOS:**

```tsx
// ✅ Perfect for Tailwind
function QuickCard({ children }) {
	return (
		<div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
			{children}
		</div>
	);
}

// ✅ Layout and spacing
function PageLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="sticky top-0 bg-white shadow-sm border-b px-4 py-3">
				<nav className="max-w-7xl mx-auto flex items-center justify-between">
					{/* content */}
				</nav>
			</header>
			<main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
				{/* content */}
			</main>
		</div>
	);
}
```

### ❌ **AVOID FOR:**

- Long className strings (>10 classes)
- Complex animations or keyframes
- Component-specific logic
- Styles that need CSS calculations

---

## 2. CSS Modules - For Complex & Component-Specific Styles

### ✅ **USE FOR:**

- **Complex Animations**: Multi-step keyframes, complex transforms
- **Advanced CSS Features**: `calc()`, CSS Grid areas, custom properties
- **Component Isolation**: Styles that should never leak
- **Performance-Critical**: Optimized animations, will-change
- **Legacy Integration**: Existing CSS that's hard to convert

### ✅ **EXAMPLE SCENARIOS:**

**Complex Animation (ProductCard.module.css):**

```css
.card {
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
	transform: translateY(-8px) scale(1.02);
}

.card:hover .image {
	transform: scale(1.1) rotate(2deg);
}

@keyframes shimmer {
	0% {
		background-position: -200px 0;
	}
	100% {
		background-position: calc(200px + 100%) 0;
	}
}

.loading {
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: shimmer 1.5s infinite;
}
```

**Complex Layout (Dashboard.module.css):**

```css
.gridContainer {
	display: grid;
	grid-template-areas:
		'sidebar header header'
		'sidebar main aside'
		'sidebar footer footer';
	grid-template-columns: 250px 1fr 300px;
	grid-template-rows: 60px 1fr 40px;
	min-height: 100vh;
}

.sidebar {
	grid-area: sidebar;
}
.header {
	grid-area: header;
}
.main {
	grid-area: main;
}
.aside {
	grid-area: aside;
}
.footer {
	grid-area: footer;
}

@media (max-width: 768px) {
	.gridContainer {
		grid-template-areas:
			'header'
			'main'
			'aside'
			'footer';
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto auto;
	}
}
```

### ❌ **AVOID FOR:**

- Simple spacing and colors
- One-off styles
- Styles that could be utilities

---

## 3. CVA (Class Variance Authority) - For Component APIs

### ✅ **USE FOR:**

- **Reusable Components**: Buttons, cards, badges with multiple variants
- **Design System**: Consistent component APIs across the app
- **Complex Conditional Logic**: Multiple props affecting styling
- **Type Safety**: When you need TypeScript support for variants

### ✅ **EXAMPLE SCENARIOS:**

**Button Component with CVA:**

```tsx
// lib/variants.ts
export const buttonVariants = cva(
	// Base styles (always applied)
	'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input hover:bg-accent hover:text-accent-foreground',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				sm: 'h-9 px-3 text-sm',
				md: 'h-10 px-4 py-2',
				lg: 'h-11 px-8 text-lg',
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-auto',
			},
		},
		compoundVariants: [
			{
				variant: 'destructive',
				size: 'lg',
				class: 'font-bold', // Special styling for large destructive buttons
			},
		],
		defaultVariants: {
			variant: 'default',
			size: 'md',
			fullWidth: false,
		},
	}
);

// components/Button.tsx
interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
}

export function Button({
	variant,
	size,
	fullWidth,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size, fullWidth }), className)}
			{...props}
		>
			{children}
		</button>
	);
}
```

**Alert Component with CVA:**

```tsx
const alertVariants = cva('relative w-full rounded-lg border p-4', {
	variants: {
		variant: {
			default: 'bg-background text-foreground',
			destructive:
				'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			warning: 'border-yellow-500/50 text-yellow-600 bg-yellow-50',
			success: 'border-green-500/50 text-green-600 bg-green-50',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});
```

### ❌ **AVOID FOR:**

- One-off components
- Simple styling without variants
- When Tailwind utilities are sufficient

---

## 4. Combination Strategies

### **Tailwind + CSS Modules (Component-Specific Complex Styles)**

```tsx
function AnimatedCard({ isActive, children }) {
	return (
		<div
			className={cn(
				// Tailwind for basic styling
				'p-6 bg-white rounded-lg shadow-sm border',
				// CSS Modules for complex animations
				styles.card,
				isActive && styles.active
			)}
		>
			{children}
		</div>
	);
}
```

### **CVA + CSS Modules (Variants with Complex Animations)**

```tsx
const cardVariants = cva('rounded-lg border', {
	variants: {
		variant: {
			default: 'bg-white shadow-sm',
			elevated: cn('bg-white shadow-lg', styles.elevatedCard), // CSS Module for complex shadow
			interactive: cn('cursor-pointer', styles.interactiveCard), // CSS Module for hover animations
		},
	},
});
```

### **All Three Together (Complex Design System Component)**

```tsx
function ProductCard({ variant, size, isLoading, className, ...props }) {
	return (
		<div
			className={cn(
				// CVA for systematic variants
				cardVariants({ variant, size }),
				// CSS Modules for complex animations
				styles.productCard,
				isLoading && styles.loading,
				// Tailwind for quick adjustments
				'hover:shadow-lg transition-shadow',
				className
			)}
			{...props}
		>
			{/* content */}
		</div>
	);
}
```

---

## 5. Maintainability Guidelines

### **File Organization for Easy Debugging:**

```
components/
├── Button/
│   ├── Button.tsx          # CVA variants + component
│   ├── Button.module.css   # Complex animations only
│   └── index.ts           # Clean exports
├── ProductCard/
│   ├── ProductCard.tsx     # Main component
│   ├── ProductCard.module.css # Component-specific styles
│   └── variants.ts        # CVA definitions if complex
```

### **Debugging Tips:**

1. **CSS Modules**: Easy to debug in DevTools - scoped class names are clear
2. **Tailwind**: Use browser extension or group related utilities
3. **CVA**: TypeScript will catch variant mistakes at compile time

### **Performance Considerations:**

- **Tailwind**: Smallest bundle size when purged properly
- **CSS Modules**: Good for code splitting and component isolation
- **CVA**: Minimal runtime overhead, mostly compile-time

---

## 6. Real-World Decision Examples

| Scenario                        | Choice                      | Reason                          |
| ------------------------------- | --------------------------- | ------------------------------- |
| Simple spacing between elements | Tailwind: `space-y-4`       | Quick, clear, responsive        |
| Button with 3 variants          | CVA                         | Type-safe, reusable, systematic |
| Loading skeleton animation      | CSS Modules                 | Complex keyframes, performance  |
| Card hover effect               | Tailwind: `hover:shadow-lg` | Simple, one-line                |
| Complex dashboard layout        | CSS Modules                 | Grid areas, breakpoint logic    |
| Form input variants             | CVA + Tailwind              | Systematic variants + utilities |
| Navigation menu animations      | CSS Modules                 | Complex transforms, timing      |
| Text color variations           | Tailwind: `text-gray-600`   | Simple, design system           |

The key is **starting simple with Tailwind** and **escalating complexity** only when needed. This keeps your codebase maintainable while leveraging each tool's strengths.

## SHORT VERSION

The key principle is progressive enhancement:
Start with Tailwind utilities → Add CVA for systematic variants → Use CSS Modules for complex cases
Quick Mental Model:

Tailwind: "Can I write this in 1-5 utility classes?" → Use Tailwind
CVA: "Will this component be reused with different variants?" → Use CVA
CSS Modules: "Do I need complex animations, calculations, or legacy CSS?" → Use CSS Modules

Maintainability Benefits:

Tailwind: Styles are visible in JSX, easy to modify quickly
CVA: Type-safe variants prevent bugs, clear component APIs
CSS Modules: Isolated scope prevents style conflicts, clear separation of concerns

This approach keeps your stylesheets lean and your components predictable, making both development and debugging much easier.
