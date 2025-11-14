# Design Guidelines: Project Management Platform

## Design Approach
**System-Based Approach** inspired by Linear, Asana, and Notion - optimized for productivity and information density. Focus on clarity, efficiency, and scalable component patterns for complex data visualization.

## Typography System
- **Primary Font**: Inter (Google Fonts) for UI elements, tables, and forms
- **Monospace Font**: JetBrains Mono for time displays and task IDs
- **Hierarchy**:
  - Page Titles: text-2xl font-semibold
  - Section Headers: text-lg font-medium
  - Task Titles: text-base font-medium
  - Body/Labels: text-sm
  - Metadata/Timestamps: text-xs

## Layout & Spacing System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, and 12 consistently
- Component padding: p-4 or p-6
- Section gaps: gap-4 or gap-6
- Card spacing: p-4 internally, gap-4 between cards
- Page margins: p-6 to p-8 for main content areas

**Layout Structure**:
- Sidebar navigation: Fixed left sidebar (w-64) with project list and quick actions
- Main content area: Full remaining width with max-w-7xl container
- Two-column layouts for split views (Kanban + Details, Gantt + Task List)

## Core Components

### Navigation & Layout
**Top Bar**: Fixed header with breadcrumb navigation, view switcher (Kanban/Gantt/Timeline), search, and user profile. Height: h-14, items centered with gap-4.

**Sidebar**: Project switcher at top, navigation menu (Dashboard, My Tasks, Team, Reports), active project details, and team member avatars at bottom.

### Kanban Board
**Column Design**: Vertical columns with rounded-lg headers, each column w-80 with minimal gap-4 between columns. Headers display column title + task count badge.

**Task Cards**: 
- Compact cards with rounded-md, border treatment
- Structure: Task title (font-medium), assignee avatar (h-6 w-6 rounded-full), due date badge, priority indicator dot
- Spacing: p-3 internal padding
- Hover state reveals quick action buttons (edit, time track, delete)

**Drag Handle**: Subtle grip icon at card edge, visible on hover

### Gantt Chart View
**Timeline Header**: Horizontal scrollable timeline with month/week divisions, sticky positioning

**Task Rows**: Left-aligned task names (w-64) + horizontal timeline bars showing duration and dependencies with connecting lines

**Chart Bars**: Rounded bars with task progress overlay (partial fill), assignee avatar inside bar when space allows

### Time Tracking Interface
**Active Timer Display**: Prominent timer card with large monospace digits (text-3xl), task name, start/stop button, and pause option

**Time Log Table**: Striped rows showing Date | Task | Duration | Notes, sortable headers, inline edit capability

**Daily Summary**: Compact card showing total hours today, breakdown by project (horizontal bar chart using small segments)

### Task Detail Panel
**Slide-over Panel**: Fixed right panel (w-96) that overlays content
- Header: Task title (editable inline), close button, status dropdown
- Body sections with gap-6: Description textarea, assignee selector with avatar, date pickers, priority buttons, time entries, comments thread
- Footer: Action buttons (Save, Delete) with gap-2

### Dashboard Cards
**Project Overview Grid**: 2-3 column grid (grid-cols-3) of stat cards
- Each card: rounded-lg, p-6, displays metric + label + trend indicator
- Include: Active Tasks, Completed This Week, Team Velocity, Overdue Items

**Activity Feed**: Single column list with avatar + action description + timestamp, recent 10 items with "View All" link

### Forms & Inputs
**Input Fields**: Consistent height h-10, rounded-md borders, px-3 padding, text-sm
**Buttons**: Primary (h-9 px-4), Secondary (h-9 px-4 with border), Icon-only (h-9 w-9 square)
**Dropdowns**: Custom select with chevron icon, max-height for scrolling, rounded-md
**Date Pickers**: Inline calendar popup with today highlight and range selection

## Component Patterns

**Avatars**: Always circular (rounded-full), sizes: h-6 w-6 (inline), h-8 w-8 (cards), h-10 w-10 (profiles)

**Badges**: Compact labels with rounded-full, px-2 py-0.5, text-xs for status, priority, tags

**Tables**: Striped rows with hover states, sticky headers, compact spacing (py-2 for cells), sortable column headers with arrow indicators

**Empty States**: Centered content with icon (h-12 w-12), heading, description, and primary action button

**Loading States**: Skeleton screens matching component structure with shimmer animation

## Icons
Use **Heroicons** (outline for navigation, solid for actions) via CDN. Standard sizes: h-4 w-4 (inline), h-5 w-5 (buttons), h-6 w-6 (headers)

## Interactions & Behaviors
- **Drag & Drop**: Visual feedback with reduced opacity (opacity-50) on drag, drop zones with dashed border on hover
- **Animations**: Minimal and purposeful - smooth transitions (transition-all duration-150) for state changes only
- **Modals**: Centered overlay with backdrop blur, max-w-lg, rounded-lg
- **Toasts**: Top-right notifications with slide-in animation, auto-dismiss after 5s

## Responsive Behavior
- Desktop (lg+): Full sidebar + multi-column layouts
- Tablet (md): Collapsible sidebar, single column Kanban, stacked Gantt
- Mobile: Hidden sidebar (hamburger menu), card-style views, bottom navigation for main actions

## Accessibility
- All interactive elements: min h-10 touch targets
- Form labels: Always visible, text-sm font-medium
- Focus states: Visible ring-2 offset-2 on all focusable elements
- ARIA labels for icon-only buttons
- Keyboard navigation for drag-and-drop (arrow keys + spacebar)