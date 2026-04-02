# Design System Documentation

## 🎨 Overview

This design system provides a comprehensive set of components, styles, and utilities to build a consistent, accessible, and user-friendly interface.

---

## 📐 Color Palette

### Primary Colors
- **Primary**: `rgb(238, 81, 23)` - Used for primary actions and highlights
- **Primary Hover**: `#e85a1a` - Hover state for primary elements
- **Primary Light**: `rgba(238, 81, 23, 0.1)` - Light background variant

### Semantic Colors
- **Success**: `#4caf50` - Positive actions and confirmations
- **Error**: `#e53935` - Destructive actions and error messages
- **Warning**: `#ff9800` - Warnings and alerts
- **Info**: `#2196f3` - Informational messages

### Background Colors
- **Primary**: `#1a1a1a` - Dark background
- **Secondary**: `#2a2a2a` - Card/component background
- **Tertiary**: `#333` - Subtle background elements

### Text Colors
- **Primary**: `#f5f5f5` - Main text
- **Secondary**: `#ccc` - Secondary text
- **Tertiary**: `#aaa` - Muted text
- **Muted**: `#999` - Disabled/placeholder text
- **Disabled**: `#666` - Disabled state

---

## 📏 Spacing System

All spacing follows a consistent scale for better rhythm and alignment:

- **XS**: `0.25rem` - Minimal gaps
- **SM**: `0.5rem` - Small gaps
- **MD**: `1rem` - Standard gap
- **LG**: `1.5rem` - Large gap
- **XL**: `2rem` - Extra large gap
- **2XL**: `3rem` - Maximum gap

Usage: `padding: var(--spacing-md);` or `gap: var(--spacing-lg);`

---

## 🔘 Components

### 1. Button Component
Located in: `src/features/shared/style/button.scss`

#### Variants:
- **Primary Button** - Main action buttons
  ```html
  <button class="primary-button">Click Me</button>
  ```

- **Secondary Button** - Alternative actions
  ```html
  <button class="secondary-button">Secondary</button>
  ```

- **Danger Button** - Destructive actions (delete, remove)
  ```html
  <button class="danger-button">Delete</button>
  ```

- **Success Button** - Confirmatory actions
  ```html
  <button class="success-button">Confirm</button>
  ```

- **Ghost Button** - Subtle/text-only buttons
  ```html
  <button class="ghost-button">Learn More</button>
  ```

#### States:
- `:hover` - Elevated shadow and color change
- `:active` - Reduced opacity on click
- `:disabled` - Grayed out and non-interactive
- `:focus-visible` - Clear focus ring for accessibility

---

### 2. FormGroup Component
Located in: `src/features/auth/components/FormGroup.jsx`

A reusable form input component with built-in validation states.

#### Props:
- `label` - Field label text
- `placeholder` - Input placeholder
- `value` - Current value
- `onChange` - Change handler
- `type` - Input type (text, email, password, etc.)
- `error` - Error message (optional)
- `required` - Show required indicator
- `disabled` - Disable input

#### Usage:
```jsx
<FormGroup
  label="Email"
  placeholder="Enter your email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>
```

#### Features:
- Focus states with visual feedback
- Error highlighting with warning icon
- Smooth transitions
- Accessibility improvements

---

### 3. Spinner Component
Located in: `src/features/shared/components/Spinner.jsx`

Loading indicator with optional label.

#### Props:
- `size` - ('sm', 'md', 'lg') - Default: 'md'
- `label` - Loading text (optional)

#### Usage:
```jsx
<Spinner size="md" label="Loading..." />
```

#### Sizes:
- **Small**: 24px ring + smaller text
- **Medium**: 40px ring + standard text
- **Large**: 56px ring + larger text

---

### 4. Toast Component
Located in: `src/features/shared/components/Toast.jsx`

Notification/feedback messages that auto-dismiss.

#### Props:
- `message` - Toast message text
- `type` - ('success', 'error', 'warning', 'info') - Default: 'info'
- `duration` - Auto-hide after (ms) - Default: 3000
- `onClose` - Callback when closed

#### Usage:
```jsx
<Toast
  message="Profile updated successfully!"
  type="success"
  duration={3000}
  onClose={() => setShowToast(false)}
/>
```

#### Types:
- **Success** - Green with checkmark icon
- **Error** - Red with X icon
- **Warning** - Orange with warning icon
- **Info** - Blue with info icon

---

### 5. Modal Component
Located in: `src/features/shared/components/Modal.jsx`

Dialog for important information or confirmations.

#### Props:
- `isOpen` - Show/hide modal
- `title` - Modal title
- `children` - Modal content
- `onClose` - Close handler
- `actions` - Array of action buttons
- `size` - ('sm', 'md', 'lg', 'xl') - Default: 'md'

#### Usage:
```jsx
<Modal
  isOpen={showModal}
  title="Confirm Delete?"
  size="md"
  onClose={() => setShowModal(false)}
  actions={[
    { label: 'Cancel', variant: 'secondary', onClick: () => setShowModal(false) },
    { label: 'Delete', variant: 'danger', onClick: handleDelete }
  ]}
>
  <p>This action cannot be undone.</p>
</Modal>
```

---

### 6. Card Component
Located in: `src/features/shared/components/Card.jsx`

Container component for grouped content.

#### Props:
- `children` - Card content
- `padding` - ('sm', 'md', 'lg', 'xl') - Default: 'lg'
- `elevated` - Add shadow (boolean)
- `className` - Additional CSS classes
- `onClick` - Click handler

#### Usage:
```jsx
<Card elevated padding="lg">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

---

## 🌲 Typography

### Heading Sizes:
- `h1` - 2.5rem
- `h2` - 2rem
- `h3` - 1.5rem
- `h4` - 1.25rem
- `h5` - 1.1rem
- `h6` - 1rem

### Font Family:
System fonts for optimal performance and readability:
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell'
```

---

## 🎭 Shadows

Elevation system using shadows:
- **SM**: `0 2px 8px rgba(0, 0, 0, 0.1)` - Subtle
- **MD**: `0 4px 16px rgba(0, 0, 0, 0.15)` - Medium
- **LG**: `0 8px 32px rgba(0, 0, 0, 0.2)` - Prominent

---

## ⚡ Transitions

Standard animation durations:
- **Fast**: 0.15s - Hover states, quick feedback
- **Normal**: 0.3s - Default transitions
- **Slow**: 0.5s - Noticeable animations

---

## 🔍 Utility Classes

Available utility classes for quick styling:

```scss
// Text alignment
.text-center { text-align: center; }

// Text colors
.text-muted { color: var(--text-secondary); }
.text-error { color: var(--error-color); }
.text-success { color: var(--success-color); }

// Spacing
.mt { margin-top: var(--spacing-md); }
.mb { margin-bottom: var(--spacing-md); }
.mt-sm { margin-top: var(--spacing-sm); }
.mb-sm { margin-bottom: var(--spacing-sm); }

// Layout
.container { max-width: 1200px; margin: 0 auto; }
```

---

## ✅ Accessibility Features

### Implemented Standards:
- ✓ Focus states on all interactive elements
- ✓ Color contrast meets WCAG AA standards
- ✓ Clear focus rings (2px solid outline)
- ✓ Semantic HTML structure
- ✓ Proper ARIA attributes on modals/notifications
- ✓ Keyboard navigation support
- ✓ Screen reader friendly

### Best Practices:
1. Always use semantic HTML (`<button>`, `<input>`, `<label>`)
2. Include labels with form inputs
3. Provide alt text for images
4. Use proper heading hierarchy
5. Ensure color isn't the only indicator

---

## 📱 Responsive Design

Breakpoints follow common device sizes:
- **Mobile**: < 480px
- **Tablet**: < 768px
- **Desktop**: >= 768px

```scss
@media (max-width: 768px) {
  // Tablet and mobile styles
}

@media (max-width: 480px) {
  // Mobile-only styles
}
```

---

## 🚀 Usage Examples

### Form Page Example:
```jsx
import { FormGroup, Toast, Modal, Spinner } from '../shared/components';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Login logic
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        required
      />
      <button type="submit" className="primary-button" disabled={loading}>
        {loading ? <Spinner size="sm" /> : 'Sign In'}
      </button>
    </form>
  );
}
```

---

## 📦 File Structure

```
src/features/
├── shared/
│   ├── components/
│   │   ├── Spinner.jsx
│   │   ├── Toast.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   └── index.js
│   └── style/
│       ├── variables.scss
│       ├── button.scss
│       ├── global.scss
│       ├── spinner.scss
│       ├── toast.scss
│       ├── modal.scss
│       └── card.scss
├── auth/
│   ├── components/
│   │   └── FormGroup.jsx
│   └── style/
│       ├── formGroup.scss
│       └── login.scss
└── home/
    └── style/
        └── player.scss
```

---

## 🎯 Best Practices

1. **Use CSS Variables** - Always reference variables instead of hardcoding colors/spacing
2. **Semantic Markup** - Use proper HTML elements for better accessibility
3. **Consistent Spacing** - Stick to the spacing scale for visual rhythm
4. **Focus States** - Never remove focus indicators, style them instead
5. **Mobile First** - Design for mobile, then add desktop features
6. **Accessibility** - Test with keyboard navigation and screen readers
7. **Reusability** - Extract components for repeated patterns
8. **Documentation** - Keep inline comments for complex styles

---

## 🔄 Updating the Design System

To add new colors, spacing values, or other design tokens:

1. Edit `src/features/shared/style/variables.scss`
2. Use the new variable throughout the codebase
3. Update this documentation
4. Test across all components

---

Last Updated: March 31, 2026
