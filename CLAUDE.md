# Universal AI-Assisted Development Principles - CLAUDE.md

*Universal development methodology for AI-assisted software engineering*

**Created by Albert Hui <albert@securityronin.com>** [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alberthui) [![Website](https://img.shields.io/badge/Website-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](https://www.securityronin.com/)

## 🎯 Core Philosophy

**Build software that works reliably, ships quickly, and evolves gracefully through systematic principles and AI-human collaboration.**

---

## 🏗️ Universal Design Principles

### 1. **Quality Without Compromise**
> "Tools must be more reliable than the problems they solve"

- **Verification-First Principle**: Always validate assumptions, inputs, and outputs
- **Fail Fast**: Validate inputs early and provide clear error messages
- **Defense in Depth**: Multiple overlapping validation checks, not single points of failure
- **Graceful Degradation**: Partial functionality better than complete failure
- **Observable Operations**: Log decisions and make system behavior transparent

**Implementation Guidelines:**
- **Documentation Standards**: ALL documentation must prioritize user success paths
- **No Unsafe Examples**: Never show potentially harmful operations without proper safeguards
- **Consistency Requirement**: Help text, documentation, and examples must use identical patterns

### 2. **Developer Experience as Core Feature**
> "Friction is the enemy of adoption"

- **Fast Feedback**: Optimize for quick iteration cycles
- **Clear Fix Instructions**: Every failure provides specific remediation steps
- **Progressive Enhancement**: Start minimal, add complexity incrementally
- **Sensible Defaults**: Work out-of-the-box for 80% of use cases
- **Emergency Escape Hatches**: Bypass mechanisms for critical situations

**Performance Budget:**
- Local operations: < 60 seconds total
- Individual checks: < 30 seconds each
- Tool installation: < 5 minutes
- First-time setup: < 10 minutes

### 3. **Ecosystem Integration**
> "Work with each technology ecosystem, not against it"

- **Native Tooling**: Leverage existing tooling and conventions for each language/platform
- **Standard Tool Chain**: Use community-standard tools for each ecosystem
- **Backward Compatibility**: Don't break existing workflows
- **Cross-Platform**: Support major development platforms
- **CI/CD Friendly**: Integrate seamlessly with automation systems

### 4. **Observable Development**
> "You can't improve what you can't measure"

- **Comprehensive Logging**: All important decisions logged with context
- **Metrics Collection**: Performance, adoption, effectiveness metrics
- **Audit Trails**: Complete history of system evolution
- **Clear Reporting**: Actionable reports for all stakeholders
- **Proactive Alerting**: Early warning of issues

### 5. **Dogfooding Philosophy**
> "If it's not good enough for us, it's not good enough for users"

- **Repository as Test**: Use your own tools in your daily development
- **Enhanced Development Controls**: Additional tooling for your specific development needs
- **Quality Assurance Through Use**: Discover issues before users encounter them
- **Trust Through Transparency**: Users can inspect your processes

---

## 🔧 Implementation Standards

### Engineering Best Practices
> "Quality code is maintainable code"

**Core Programming Principles:**
- **DRY (Don't Repeat Yourself)**: Extract common patterns into reusable components
- **YAGNI (You Aren't Gonna Need It)**: Implement only what's needed now
- **KISS (Keep It Simple, Stupid)**: Choose simple solutions when both work
- **SINE (Simple Is Not Easy)**: Simple solutions require more thought than complex ones
- **Single Responsibility**: Each component has one clear purpose
- **No Special Cases**: Design general solutions rather than hardcoded exceptions
- **Immutable by Default**: Prefer immutable data structures and functional approaches

**External Integration Standards:**
- **Documentation-First**: Study API documentation thoroughly before implementation
- **Version Pinning**: Always pin external dependencies to specific versions
- **Graceful Degradation**: Handle external service failures without breaking core functionality
- **Rate Limiting**: Respect external API limits and implement backoff strategies
- **Timeout Handling**: Set reasonable timeouts for all external calls

**Code Organization:**
- **Modular Architecture**: Organize code into logical, testable modules
- **Clear Interfaces**: Define explicit contracts between components
- **Separation of Concerns**: Keep business logic separate from I/O operations
- **Configuration Management**: Externalize configuration, never hardcode values
- **Resource Management**: Proper cleanup of files, connections, and other resources

**Performance and Reliability:**
- **Early Optimization**: Profile before optimizing, measure impact
- **Caching Strategy**: Cache expensive operations with proper invalidation
- **Memory Management**: Be conscious of memory usage and potential leaks
- **Concurrent Safety**: Design for thread safety when applicable
- **Idempotency**: Operations should be safe to retry

---

## 🎨 User Experience Principles

### Installation Experience
- **Progressive Disclosure**: Show basic options first, advanced on request
- **Sensible Defaults**: Work out-of-the-box for majority of projects
- **Clear Feedback**: Progress indicators and status messages
- **Graceful Degradation**: Partial installation better than complete failure

### Developer Workflow
- **Invisible When Working**: Tools run automatically without intervention
- **Visible When Broken**: Clear, actionable error messages with fixes
- **Respectful of Time**: Fast feedback loops, no waiting
- **Learning Oriented**: Help developers understand concepts
- **Emergency Friendly**: Bypass mechanisms for critical fixes

### Error Messages and Guidance
```bash
❌ Configuration error detected

   Problem: Missing required field 'api_key' in config.yaml

   Fix: Add api_key to your configuration file
        echo "api_key: your_key_here" >> config.yaml

   For emergency bypass: export SKIP_CONFIG_CHECK=1
   (Use bypass only for critical hotfixes)
```

### Documentation Organization and User Journey
- **Quickstart First**: Always put quickstart guides at the top of documentation lists
- **Cognitive Load Minimization**: Order content by user journey complexity (basic → intermediate → expert)
- **Smooth Flow and Pacing**: Optimize information architecture for immediate action, then progressive learning
- **User-Centric Navigation**: Structure all documentation around user intent, not system architecture

**Implementation Standards:**
- **New Users**: Quick Start → Installation Guide → Basic Configuration
- **Power Users**: Architecture → Advanced Features → Customization
- **Contributors**: Contributing Guide → Technical Details → Design Principles
- **Navigation Order**: Get Started → Power Users → Development/Contributing
- **Link Organization**: Essential actions before technical deep-dives

**Rationale**: Users arrive with specific intents - most want to get started quickly. Bury advanced technical details below actionable guides to reduce abandonment and improve success rates.

### Visual Priority and Reading Patterns
- **Left-to-Right Priority**: Place highest priority information in leftmost columns (users read left→right, top→bottom)
- **Scannable Priority**: Use visual indicators (emojis, colors, typography) in the leftmost position for instant priority recognition
- **Table Design**: Priority column should be first column, followed by identification, then details
- **Executive Readability**: Senior management should see critical vs. non-critical items within first 2 seconds of scanning

**Examples:**
```markdown
✅ Good: | 🚨 CRITICAL | V1 | Identity Spoofing | ...
❌ Bad:  | V1 | Identity Spoofing | ... | 🚨 CRITICAL
```

**Rationale**: Human reading patterns follow F-pattern (focus on left edge), so priority indicators must be positioned where attention naturally falls first.

---

## 🚀 Development Workflow

### Task Prioritization: "Informed Frog Eating" Approach

**Philosophy**: Optimize for both peak cognitive utilization and context building through strategic task sequencing.

**Three-Phase Process:**

**Phase 1: Rapid Reconnaissance (2-3 minutes)**
- Quick scan of ALL tasks to identify true complexity and scope
- Surface hidden dependencies, cascade effects, and blockers
- Assess context switching costs and information requirements
- Map relationships between tasks (which enable/block others)

**Phase 2: Strategic Prioritization**
- **Eat the Frog IF**: Clear scope + no dependencies + truly blocking other work
- **Build Context IF**: Multiple simple tasks create foundational understanding for complex work
- **Parallel Process IF**: Can batch related tasks efficiently with shared context
- **Defer Complex IF**: Insufficient information or context requires preliminary work

**Phase 3: Adaptive Execution**
- Monitor for emerging blockers and complexity escalation
- Switch to frog-eating mode when blockers become apparent
- Continue context-building on simple tasks when they inform complex work
- Batch context-heavy operations (file reads, system analysis)

**Decision Matrix:**
```
High Impact + High Complexity + Clear Scope = EAT THE FROG 🐸
High Impact + Low Complexity = BUILD CONTEXT FIRST ⚡
Low Impact + High Complexity = DEFER OR ELIMINATE ⏸️
Multiple Related Tasks = BATCH PROCESS 📦
```

**Applied Examples:**
- **Frog**: Establishing core architecture patterns (affects all components)
- **Context**: Fixing typos across multiple files (builds codebase understanding)
- **Batch**: Reading multiple config files for comprehensive understanding
- **Defer**: Complex refactoring when requirements are still unclear

**Anti-Patterns to Avoid:**
- ❌ Starting complex work without understanding full scope
- ❌ Building context through work that will be invalidated by harder tasks
- ❌ Context switching between unrelated complex problems
- ❌ Avoiding hard but critical decisions that block progress

### File Management and Impact Analysis

**Critical Rule**: File renames, moves, and deletions require comprehensive impact analysis across the entire codebase.

**Problem**: When files are renamed or moved, references can be scattered across:
- Documentation internal links
- CI/CD workflow files (`.github/workflows/*.yml`)
- Scripts and automation tools
- Configuration files (`package.json`, `Cargo.toml`, etc.)
- Cross-references in other documentation

**Required Process for File Changes:**
1. **Pre-Change Analysis**: Search globally for ALL references to the file(s)
   ```bash
   # Search for any references to files being changed
   git grep -n "old-filename"
   find . -type f -name "*.md" -o -name "*.yml" -o -name "*.json" | xargs grep -l "old-filename"
   ```

2. **Multi-Dimensional Update**: Update ALL discovered references simultaneously:
   - Documentation links and cross-references
   - Workflow trigger paths and file lists
   - Script file arguments and parameters
   - Configuration navigation and includes
   - Any hardcoded file paths or names

3. **Validation**: Test all affected systems after changes:
   ```bash
   # Test builds
   npm run build # or cargo build, etc.
   # Test documentation
   # Test automation workflows
   ```

**Success Pattern**:
- ✅ Global search reveals ALL references before making changes
- ✅ All references updated atomically in same commit
- ✅ Validation tools run to confirm no broken links or references
- ✅ CI workflows tested to ensure they pass after changes

### Documentation Link Format Standards

**Critical Rule**: Test your documentation link formats with the specific tools in your ecosystem.

**Universal Principle**: Different documentation tools have different link interpretation rules. What works for one tool may break validation in another.

**Example: GitHub + MkDocs Ecosystem**:

1. **Internal Documentation Links** (within docs/ folder):
   ```markdown
   # ✅ CORRECT - Direct file references
   [Quick Start](quickstart.md)
   [Installation Guide](installation.md)

   # ❌ INCORRECT - Directory-style (may break validation)
   [Quick Start](quickstart/)
   [Installation Guide](installation/)
   ```

2. **Documentation Site URLs** (external references):
   ```markdown
   # ✅ CORRECT - No trailing slashes
   https://your-site.github.io/project/quickstart
   https://your-site.github.io/project/installation

   # ❌ INCORRECT - Trailing slashes (may cause 404 errors)
   https://your-site.github.io/project/quickstart/
   https://your-site.github.io/project/installation/
   ```

**Your Validation Process**:
1. **Identify Your Tools**: What documentation generator do you use? What link validator?
2. **Test with Documentation Generator**: Ensure site generates correctly
3. **Test with Link Validators**: Ensure CI validation passes
4. **Manual Verification**: Click links in both rendered and raw formats

**Other Common Ecosystems**:
- **GitLab + Hugo**: Different link format requirements
- **Bitbucket + Jekyll**: Different validation rules
- **Notion + Custom**: Completely different link handling

**Adaptation Required**: These examples show GitHub + MkDocs patterns. You must test and adapt link formats for your specific tool combination.

### Preferred Development Tools

**Critical Rule**: Use the fastest, most reliable tools available for common operations.

**Modern Development Tools** (use when available, with fallbacks):

**Search and File Operations**:
- **git grep** - Search git-tracked files (repository scope, most accurate for version control)
- **ripgrep (`rg`)** - Search filesystem (broader scope, 10-100x faster than grep, respects .gitignore)
- **fd (`fd`)** - Find files (faster than find, simpler syntax, respects .gitignore)
- **/bin/ls** - Use full path to bypass slow aliases (developers often alias ls to colorized versions)

**Package Managers** (by ecosystem):
- **pnpm** over npm - Faster installs, disk space efficient, strict dependency resolution
- **bun** - Ultra-fast JavaScript runtime and package manager
- **uv** over pip - Extremely fast Python package manager (10-100x faster)

**Developer Experience**:
- **zoxide (`z`)** - Smart cd that learns your patterns
- **fzf** - Fuzzy finder for files, history, processes
- **delta** - Better git diff with syntax highlighting
- **dust (`dust`)** - Disk usage analyzer (better than du)
- **procs** - Modern ps with tree view and search
- **sd** - Intuitive sed alternative for find-and-replace
- **tokei** - Fast code statistics (lines of code, languages)

**Tool Selection by Use Case**:
```bash
# Search git-tracked files (most common for repository analysis)
git grep "pattern"                    # searches git index
git grep -n "pattern"                 # with line numbers

# Search all files (broader analysis, includes untracked)
rg "pattern"                          # fast filesystem search
rg "pattern" --type py                # specific file types
rg "pattern" -A 3 -B 3               # with context

# Find files (locate files by name/pattern)
fd "filename"                         # fast file finding
fd -e py                              # by extension
fd -t f "pattern"                     # files only

# List files (bypass slow aliases)
/bin/ls -la                           # use full path to bypass colorized aliases
command ls -la                        # alternative: use command builtin
\\ls -la                              # alternative: escape alias with backslash

# Package management (JavaScript)
pnpm install                          # faster, more efficient
bun install                           # ultra-fast alternative
npm install                           # fallback

# Package management (Python)
uv pip install package                # extremely fast pip replacement
pip install package                   # fallback

# Find-and-replace
sd "old" "new" file                   # intuitive sed alternative
sed 's/old/new/g' file               # fallback

# Tool availability checks
command -v pnpm >/dev/null && pnpm install || npm install
command -v uv >/dev/null && uv pip install package || pip install package

# Fast ls (bypass aliases)
/bin/ls -la                           # always use native ls for performance
```

**Why These Tools Matter**:
- **Performance**: 10-100x speed improvement for large codebases and operations
- **Ergonomics**: Better defaults, cleaner output, more intuitive syntax
- **Git Integration**: Automatically respects .gitignore, shows git status, integrates with workflows
- **Developer Experience**: Syntax highlighting, fuzzy finding, intelligent suggestions
- **Modern Standards**: Becoming standard in modern development environments
- **Disk Efficiency**: Tools like pnpm save significant disk space and bandwidth

**Installation Check**:
```bash
# Core modern tools check
echo "Checking modern development tools..."
command -v rg && echo "✅ ripgrep" || echo "❌ ripgrep (install: brew install ripgrep)"
command -v fd && echo "✅ fd" || echo "❌ fd (install: brew install fd)"
command -v pnpm && echo "✅ pnpm" || echo "❌ pnpm (install: npm install -g pnpm)"
command -v uv && echo "✅ uv" || echo "❌ uv (install: pip install uv)"
test -x /bin/ls && echo "✅ native ls available" || echo "❌ /bin/ls not found"

# Alternative: one-liner check
(command -v rg && command -v fd) >/dev/null && echo "✅ Core modern tools available" || echo "⚠️ Consider installing modern CLI tools for better performance"
```

### Testing Strategy
- **Unit Tests**: Individual component functionality
- **Integration Tests**: End-to-end workflow validation
- **Performance Tests**: Timing and resource usage
- **User Acceptance Tests**: Real-world usage scenarios

### Release Process
1. **Version Management**: Use consistent versioning across all project files
2. **Testing**: Full test suite on multiple platforms/environments
3. **Documentation**: Update all relevant documentation
4. **Artifact Generation**: Create and verify release artifacts
5. **Announcement**: Clear release notes highlighting changes and upgrade paths

---

## 🤝 Community Guidelines

### Contribution Principles
- **Quality First**: All contributions must maintain or improve system quality
- **Performance Conscious**: Consider impact on user workflow
- **Backward Compatible**: Don't break existing functionality
- **Well Tested**: Include tests demonstrating correctness
- **Documented**: Explain rationale and trade-offs

### Code Review Standards
- **Functionality Review**: All changes reviewed for correctness
- **Performance Review**: Impact measured and approved
- **Usability Review**: Consider user experience impact
- **Documentation Review**: Ensure guides remain accurate

---

## 📝 Maintenance Philosophy

### Tool Lifecycle Management
- **Evaluation**: Continuous assessment of tool effectiveness
- **Integration**: Thoughtful integration minimizing disruption
- **Maintenance**: Regular updates and compatibility patches
- **Deprecation**: Graceful removal when tools become obsolete
- **Migration**: Smooth transitions between tool versions

### Breaking Changes
- **Avoid When Possible**: Maintain backward compatibility
- **Migrate Gradually**: Provide migration paths and tools
- **Communicate Clearly**: Advanced notice and documentation
- **Support Legacy**: Maintain critical updates for previous versions
- **Learn from Experience**: Feedback-driven improvement process

---

**These principles serve as the foundation for all development decisions. When in doubt, refer to these principles to guide technical and product choices.**

---

---

## 📄 License

**Creative Commons Attribution 4.0 International (CC BY 4.0)**

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

**Under the following terms:**
- **Attribution** — You must give appropriate credit to Albert Hui <albert@securityronin.com>, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**Attribution Format:**
```
Based on "Universal AI-Assisted Development Principles" by Albert Hui
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
Source: https://t.ly/CLAUDE.md
```

---

*This document represents universal development methodology that can be adapted to any software project. For project-specific implementations, create a project CLAUDE.md that references these universal principles and adds domain-specific guidance.*

*Version: 1.0.0*
*Created: September 26, 2025*
*Author: Albert Hui <albert@securityronin.com>*