# EisenBoard 🎯

> **ADHD-Friendly Task Management**: A research-backed Eisenhower Matrix Kanban board designed specifically to help neurodivergent individuals overcome daily challenges through structured prioritization, task breakdown, and evidence-based productivity strategies.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 🧠 Designed for Neurodiversity

EisenBoard was specifically created to address the unique challenges faced by individuals with ADHD and other neurodivergent conditions. Based on peer-reviewed research and evidence-based strategies, this tool transforms overwhelming task lists into manageable, prioritized actions.

### 🎯 Core ADHD Challenges We Address

**1. Inability to Assess Priorities**
- Difficulty distinguishing between urgent and important tasks
- Decision paralysis when faced with multiple competing priorities
- Tendency to focus on less important but more stimulating tasks
- **Solution**: Clear Eisenhower Matrix categorization with visual cues

**2. Task Overwhelm Leading to Procrastination**
- Feeling paralyzed by large, complex projects
- Executive dysfunction preventing task initiation
- "All-or-nothing" thinking that prevents starting
- **Solution**: Hierarchical task breakdown into 3-minute actionable subtasks

**3. Communication & Organization Difficulties**
- Disorganized speech and difficulty staying on topic
- Trouble with workplace self-advocacy and priority explanation
- Impulsivity in task switching without clear reasoning
- **Solution**: Structured task documentation and priority transparency

### 📚 Research-Backed Strategies Implemented

**Task Breakdown Philosophy (3-Minute Rule)**
> *"Breaking overwhelming tasks into manageable parts prevents mental fatigue and attention drift"* - ADHD productivity research

- Tasks designed to be completed in under 3-10 minutes
- Unlimited nesting for complex project management
- Visual hierarchy maintains context during task switching
- Quick wins build momentum and reduce procrastination

**Structured Communication Support**
> *"Scripted or prewritten communication is an evidence-backed ADHD communication aid"* - Connected Speech Pathology

- Clear task documentation serves as conversation starters
- Priority visualization helps explain workload to others
- Progress tracking provides concrete evidence for self-advocacy
- Structured categorization reduces "rambling" in status updates

**Executive Function Support**
> *"Visual organization and structured decision-making frameworks help manage ADHD attention and reduce cognitive load"*

- Four-quadrant system eliminates priority decision fatigue
- Drag-and-drop interface accommodates kinesthetic learning
- Immediate visual feedback prevents lost attention
- Clean, distraction-free design supports hyperfocus

## ✨ ADHD-Optimized Features

### Core Productivity Tools
- **🎯 Eisenhower Matrix**: Research-backed priority framework eliminates decision paralysis
- **📋 Hierarchical Kanban**: Visual task management with unlimited nesting depth
- **🤖 AI Task Breakdown**: Automatically decompose overwhelming projects into 3-minute actions
- **⚡ Quick Task Entry**: Minimal friction for capturing racing thoughts

### Neurodiversity-Specific Design
- **🧠 Executive Function Support**: Structured decision-making reduces cognitive load
- **👁️ Visual Priority System**: Color-coded quadrants for instant priority recognition
- **🎯 Hyperfocus Accommodation**: Detailed task tracking without overwhelming interface
- **🔄 Context Preservation**: Parent-child task relationships maintain project coherence

### Communication & Self-Advocacy Tools
- **📊 Progress Visualization**: Concrete evidence for workplace discussions
- **📝 Task Documentation**: Pre-structured talking points for meetings
- **🎨 Distraction-Free Interface**: Clean design optimized for ADHD attention patterns
- **💾 Reliable Persistence**: Never lose tasks due to browser crashes or attention lapses

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
   - Select "Break Down into Subtasks"
   - Watch AI break it down into actionable items

## 🧠 ADHD-Specific Usage Guide

### Getting Started with ADHD in Mind

**Step 1: Start Small to Build Momentum**
- Begin with only 3-5 tasks maximum
- Focus on the "Do First" (red) quadrant initially
- Use the "Sample Data" button to see example task organization
- Celebrate small wins - move completed tasks to "Done" for motivation

**Step 2: Combat Overwhelm with Breakdown**
```
Overwhelming: "Prepare quarterly presentation"
↓ Break Down ↓
✅ Research Q3 metrics (3 min)
✅ Find presentation template (2 min)
✅ Write slide outline (5 min)
✅ Draft introduction (10 min)
```

**Step 3: Use as Communication Tool**
- Show your task board during 1:1s with managers
- Use priority categories to explain workload distribution
- Reference completed tasks for performance discussions
- Export task lists for project status updates

### ADHD-Friendly Workflow Tips

**For Executive Dysfunction:**
- Use "Quick Add" to capture thoughts immediately before they're forgotten
- Don't overthink categorization - you can drag tasks between quadrants later
- Break down any task that feels "too big" or causes avoidance

**For Hyperfocus Sessions:**
- Expand parent tasks to see all subtasks in context
- Use unlimited nesting depth for detailed project planning
- Visual progress tracking maintains motivation during long work sessions

**For Communication Challenges:**
- Pre-written task descriptions serve as meeting talking points
- Visual priority matrix helps explain decisions to others
- Completed task history provides concrete accomplishment evidence

## 📖 How to Use

### The Eisenhower Matrix for ADHD

The four-quadrant system eliminates priority decision paralysis common in ADHD:

| Quadrant | Description | ADHD Benefit | Examples |
|----------|-------------|--------------|----------|
| **🚨 Do First** | Urgent & Important | Reduces crisis overwhelm | Deadline projects, emergencies |
| **📅 Schedule** | Important, Not Urgent | Prevents procrastination on big goals | Skill development, health tasks |
| **🤝 Delegate** | Urgent, Not Important | Identifies attention drains | Interruptions, some emails |
| **🗑️ Eliminate** | Neither Urgent nor Important | Removes ADHD time-wasters | Social media, excessive planning |

**Why This Works for ADHD:**
- **Visual Priority Cues**: Color-coding eliminates decision fatigue
- **Structured Decision Making**: Framework replaces overwhelming choice paralysis
- **Context Switching Support**: Clear categories help justify task changes
- **Hyperfocus Prevention**: "Eliminate" quadrant catches time-sink activities

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

## 📚 Research & Evidence Base

This tool incorporates strategies from peer-reviewed research on ADHD communication, productivity, and executive function:

### ADHD Communication Challenges Addressed
- **Impulsivity & Interrupting**: Structured task documentation provides pre-planned talking points
- **Disorganized Speech**: Visual priority matrix helps maintain topic focus during discussions
- **Inattentive Listening**: Written task descriptions serve as conversation anchors
- **Difficulty Reading Social Cues**: Clear priority categories help explain decision-making to others

### Evidence-Based Strategies Implemented

| Research Finding | Implementation in EisenBoard | Reference |
|------------------|------------------------------|-----------|
| Task breakdown prevents overwhelm | 3-minute subtask targeting | ADHD time management studies |
| Scripted communication aids ADHD | Structured task documentation | Connected Speech Pathology |
| Visual organization supports attention | Color-coded priority quadrants | Executive function research |
| Structured frameworks reduce decision fatigue | Eisenhower Matrix implementation | Productivity psychology |

### The 10-3 Rule Connection
While EisenBoard doesn't include built-in timers, our task breakdown philosophy aligns with the research-backed "10-3 Rule" (10 minutes work, 3 minutes break):
- Small, focused tasks naturally fit within 10-minute work sprints
- Hierarchical organization preserves context during breaks
- Quick completion provides natural stopping points
- Visual progress tracking maintains motivation across sessions

### Communication Research Applied
Based on findings that ADHD individuals benefit from **scripted communication**, EisenBoard provides:
- Pre-structured task descriptions for workplace discussions
- Priority justification through visual categorization
- Progress evidence for performance conversations
- Context-rich documentation that reduces rambling or disorganization

**Key Research Sources:**
- WebMD: ADHD Communication Challenges and Solutions
- Connected Speech Pathology: ADHD-Friendly Communication in the Workplace
- National Institute of Mental Health: Executive Function Support Strategies
- Journal of Attention Disorders: Task Management and ADHD Productivity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ADHD Community**: Inspired by and built for the neurodivergent community's unique needs
- **Research Foundation**: Based on peer-reviewed studies in ADHD communication and productivity
- **Eisenhower Matrix**: Adapted from President Dwight D. Eisenhower's decision-making framework
- **Design System**: Built with [Radix UI](https://radix-ui.com/) for accessibility and usability
- **AI Integration**: Powered by [Anthropic's Claude](https://anthropic.com/) via [OpenRouter](https://openrouter.ai/)
- **Inclusive Design**: Informed by executive function research and neurodiversity advocacy

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/h4x0r/eisenboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/h4x0r/eisenboard/discussions)
- **Email**: [albert@securityronin.com](mailto:albert@securityronin.com)

## 🗺️ Research-Driven Roadmap

Our development roadmap is informed by ADHD research, technical feasibility analysis, and community feedback. We focus on features best suited for web applications while acknowledging where external tools excel.

### ✅ **Feasible Web-Based ADHD Features**

**High Priority - Core Strengths**
- [ ] **Enhanced Task Breakdown**: AI-powered subtask generation with time estimation
- [ ] **Overwhelm Detection**: Smart alerts when task queue becomes unmanageable
- [ ] **Hyperfocus Mode**: Distraction-free interface with context preservation
- [ ] **Meeting Prep Assistant**: Auto-generate talking points from task progress
- [ ] **Workload Visualization**: Interactive charts for explaining capacity to managers

**Medium Priority - Valuable Additions**
- [ ] **Pattern Recognition**: Identify personal productivity patterns in task data
- [ ] **Accomplishment Reports**: Automated weekly/monthly progress summaries
- [ ] **Script Generator**: ADHD-friendly email/message templates
- [ ] **Task Duration Learning**: AI learns your actual vs estimated completion times
- [ ] **High Contrast Themes**: Visual accessibility improvements for cognitive support

**Lower Priority - Nice to Have**
- [ ] **Progressive Web App**: Offline functionality with iOS limitations acknowledged
- [ ] **Voice Task Entry**: Experimental feature using Web Speech API (privacy limitations)
- [ ] **Personal Insights Dashboard**: Analytics on your productivity patterns
- [ ] **Export Integrations**: One-way data export to external calendar/task apps

### ⚠️ **Limited Feasibility - External Solutions Recommended**

**Timer & Background Operations**
- **Pomodoro/10-3 Rule Timers**: Web browsers limit background tab reliability
  - *Recommended*: [Forest](https://www.forestapp.cc/), [Focus Keeper](https://fokuskeeper.com/), or native Pomodoro apps
- **Context Switching Alerts**: Requires system-level access unavailable to web apps
  - *Recommended*: [RescueTime](https://www.rescuetime.com/), [Toggl](https://toggl.com/)

**System Integration**
- **Calendar Sync**: Security limitations and API complexity favor external solutions
  - *Recommended*: Use EisenBoard export → import to Google Calendar/Outlook
- **Energy Level Tracking**: Health data requires dedicated apps with proper permissions
  - *Recommended*: [Daylio](https://daylio.net/), Apple Health, Google Fit integration
- **Accountability Partners**: Social features better suited for dedicated platforms
  - *Recommended*: Share EisenBoard exports in existing social tools (Slack, Discord)

**Privacy-Intensive Features**
- **Always-On Notifications**: Browser notification limits and user privacy concerns
  - *Recommended*: Use EisenBoard with external reminder apps like [Due](https://www.dueapp.com/)
- **Deep System Monitoring**: Requires permissions beyond web app scope
  - *Recommended*: [Cold Turkey](https://getcoldturkey.com/), [Freedom](https://freedom.to/)

### 🤝 **Integration Strategy**

Rather than duplicating external tools, EisenBoard will excel at:
1. **Data Export**: Seamless export to external calendar/timer/social apps
2. **Import Flexibility**: Easy import from other task management systems
3. **API-First Design**: Enable third-party integrations and browser extensions
4. **Cross-Platform URLs**: Shareable task links for communication tools

### 📊 **Research & Community**
- [ ] **Anonymous Usage Analytics**: Contribute to ADHD productivity research (opt-in)
- [ ] **ADHD Community Resources**: Curated list of complementary tools and strategies
- [ ] **Research Collaboration**: Partner with ADHD researchers for evidence-based improvements
- [ ] **Tool Recommendations**: Maintain updated list of best external ADHD tools

**Technical Reality Check:**
Web applications excel at visual organization, data manipulation, and cross-platform access but face inherent limitations with background operations, system integration, and privacy-intensive features. EisenBoard focuses on its strengths while providing pathways to proven external solutions.

---

<div align="center">

## 👨‍💻 Author

**Built with ❤️ for the neurodivergent community**

**Albert Hui** - *Creator & Lead Developer*
📧 [albert@securityronin.com](mailto:albert@securityronin.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/alberthui)
[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://securityronin.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/h4x0r)

*"Technology should empower neurodivergent minds, not overwhelm them."*

---

### 🤝 Support This Project

If EisenBoard helps you manage ADHD challenges, consider:

- ⭐ **Star this repository** to help others discover it
- 🐛 **Report issues** to improve the tool for everyone
- 💡 **Share feedback** about your ADHD experience with the tool
- 🔄 **Contribute** features that help the neurodivergent community
- 📢 **Spread awareness** about ADHD-friendly productivity tools

### 📄 License Information

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

**Why MIT License for ADHD Tools?**
- ✅ **Free forever** - No barriers to access for neurodivergent individuals
- ✅ **Open source** - Community can adapt for specific ADHD needs
- ✅ **Commercial friendly** - Organizations can integrate ADHD-friendly features
- ✅ **Research friendly** - Academics can study and improve the approach

### 🌟 Recognition

This tool exists thanks to:
- **The ADHD Community** - For sharing experiences and challenges
- **Neurodivergent Advocates** - For pushing accessibility in technology
- **ADHD Researchers** - For evidence-based strategies we implement
- **Open Source Contributors** - For making inclusive tools possible

**Ready to transform your ADHD task overwhelm into organized productivity?**

🚀 **[Try EisenBoard Live](https://eisenboard.vercel.app)** 🚀

</div>