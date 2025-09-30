# EisenBoard 🎯

> A modern Eisenhower Matrix Kanban board with AI-powered task expansion

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

- **🎯 Eisenhower Matrix**: Organize tasks by urgency and importance
- **📋 Kanban Board**: Visual task management with drag-and-drop
- **🤖 AI Task Expansion**: Break down complex tasks into actionable subtasks
- **🎨 Multiple Themes**: Light, Dark, Catppuccin, and Solarized themes
- **💾 Local Storage**: Tasks persist in your browser
- **📤 Import/Export**: Backup and restore your tasks
- **⚡ Fast & Responsive**: Built with modern web technologies

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/h4x0r/eisenboard.git
   cd eisenboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 AI Task Expansion Setup

To enable AI-powered task breakdown, you'll need an OpenRouter API key:

1. **Get API Key**
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Create an API key

2. **Configure Environment**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here" > .env.local
   ```

3. **Use the Feature**
   - Create a task
   - Click the three dots menu (⋯)
   - Select "Expand into Subtasks"
   - Watch AI break it down into actionable items

## 📖 How to Use

### The Eisenhower Matrix

Tasks are organized into four quadrants:

| Quadrant | Description | Action |
|----------|-------------|---------|
| **🚨 Do First** | Urgent & Important | Handle immediately |
| **📅 Schedule** | Important, Not Urgent | Plan and schedule |
| **🤝 Delegate** | Urgent, Not Important | Delegate if possible |
| **🗑️ Eliminate** | Neither Urgent nor Important | Eliminate or minimize |

### Task Management

1. **Quick Add**: Use the input at the top to quickly add tasks
2. **Drag & Drop**: Move tasks between quadrants and statuses
3. **Edit Tasks**: Click the three dots menu to edit, expand, or delete
4. **Status Tracking**: Todo → In Progress → Done

### Themes

Click the palette icon (🎨) to choose from:
- **Light/Dark/System**: Standard themes
- **Catppuccin**: Latte, Mocha, Macchiato, Frappe
- **Solarized**: Light and Dark variants

## 🛠️ Development

### Project Structure

```
eisenboard/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles & themes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # UI primitives (Radix UI)
│   ├── kanban-board.tsx  # Main board component
│   ├── task-card.tsx     # Individual task cards
│   └── theme-switcher.tsx # Theme selection
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and API clients
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

### Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [OpenRouter](https://openrouter.ai/) with Claude Sonnet 4

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Create production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Code Quality

This project follows the [Universal AI-Assisted Development Principles](CLAUDE.md):

- ✅ **Quality Without Compromise**: Comprehensive error handling and validation
- ✅ **Developer Experience**: Fast feedback loops and clear documentation
- ✅ **Ecosystem Integration**: Uses standard tools and practices
- ✅ **Observable Development**: Comprehensive logging and metrics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `pnpm build && pnpm lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Eisenhower Matrix**: Inspired by President Dwight D. Eisenhower's decision-making framework
- **Design System**: Built with [Radix UI](https://radix-ui.com/) primitives
- **AI Integration**: Powered by [Anthropic's Claude](https://anthropic.com/) via [OpenRouter](https://openrouter.ai/)
- **Themes**: Catppuccin and Solarized color schemes

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/h4x0r/eisenboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/h4x0r/eisenboard/discussions)
- **Email**: [albert@securityronin.com](mailto:albert@securityronin.com)

## 🗺️ Roadmap

- [ ] **Real-time Collaboration**: Multi-user editing
- [ ] **Mobile App**: React Native version
- [ ] **Integrations**: Todoist, Notion, GitHub Issues
- [ ] **Advanced AI**: Smart task prioritization
- [ ] **Analytics**: Productivity insights and reports
- [ ] **Team Features**: Shared boards and permissions

---

<div align="center">

**Built with ❤️ by [Albert Hui](https://securityronin.com)**

[Website](https://securityronin.com) • [LinkedIn](https://linkedin.com/in/alberthui) • [GitHub](https://github.com/h4x0r)

</div>