# Project Workflow Guide

## Overview
This project follows a milestone-based development approach with automated retrospectives to create a continuous improvement feedback loop.

## Milestone Structure

### File Location and Organization
All milestones are stored as individual files in the `artifacts/milestones/` directory. Each milestone has its own markdown file:
- Example: `artifacts/milestones/milestone_1.md`
- Example: `artifacts/milestones/milestone_2.md`

### How to Execute Milestones
1. When asked to work on a milestone (e.g., "do milestone 1"), look in the `artifacts/milestones/` directory for the corresponding file
2. Open the specific milestone file (e.g., `milestone_1.md` for "milestone 1")
3. **Review Upstream Documents** - ALWAYS review these critical context documents:
   - `artifacts/PRODUCT_BRIEF.md` - Understand the overall product vision, goals, and requirements
   - `artifacts/UX_SPECIFICATION.md` - Understand the user experience flow and interaction design
   - `artifacts/CREATIVE_SPECIFICATION.md` - Understand the visual design system and component specifications
   - `artifacts/DESIGN_SYSTEM.md` - Understand the design tokens, colors, typography, and spacing guidelines
4. **Review Previous Work** (if applicable) - Read `artifacts/RETROSPECTIVE.md` to understand what was accomplished in previous milestones, challenges encountered, and lessons learned
   - **IMPORTANT**: To avoid token limit errors, only read the last 100 lines of the retrospective file using the Read tool with `limit: 100` parameter
5. Read and follow the technical implementation plan exactly as specified in the milestone
6. Complete all acceptance criteria before considering the milestone finished

## Retrospective Process

### After Milestone Completion
Once a milestone is successfully completed:
1. **Pause** - Do not immediately proceed to the next milestone
2. **Update Retrospective** - Add an entry to `artifacts/RETROSPECTIVE.md` with:
   - **Milestone Summary**: What was accomplished
   - **Challenges Encountered**: Any problems or obstacles faced
   - **Solutions Applied**: How challenges were resolved
   - **Technical Notes**: Implementation details for future reference
   - **Improvement Suggestions**: This is CRITICAL - With the full context of upstream documents in mind, identify:
     - Ways the milestone instructions could have been made more efficient
     - Ambiguities or gaps in the specifications that caused confusion
     - Better approaches or patterns discovered during implementation
     - Specific recommendations for improving future builds of this same project
     - Tools, libraries, or techniques that could streamline the process
   - **IMPORTANT**: Always append the new milestone entry to the END of the retrospective file to maintain chronological order (Milestone 1 → 2 → 3... etc.)
3. **Commit All Work** - Create a Git commit that includes:
   - All code changes and new files created during the milestone
   - The updated retrospective file (`artifacts/RETROSPECTIVE.md`)
   - Use a descriptive commit message that summarizes the milestone accomplishments

### Retrospective Format
Each retrospective entry should follow this structure:
```markdown
## Milestone <number> - <Title>
**Completed**: <date>

### Summary
Brief description of what was accomplished.

### Challenges
- Challenge 1: Description and resolution
- Challenge 2: Description and resolution

### Technical Notes
- Key implementation decisions
- Dependencies or configuration details
- Performance considerations

### Future Improvements
- Suggestions for optimizing this milestone
- Better approaches discovered during implementation
- Tools or techniques that could streamline the process
```

## Continuous Improvement
The retrospective process creates a positive feedback loop where:
- Each completed milestone improves our understanding
- Challenges become learning opportunities  
- Future milestone execution becomes more efficient
- The prompts themselves can be refined based on real implementation experience
- **Your improvement suggestions are vital for future builds** - This agent's role is not just to implement, but to actively identify ways to make the entire development process more efficient for future iterations of this same project

## Command Reference
- **Testing**: Execute tests using `npm test` or `npm run test`
- **Development Server**: Start the development server using `npm run dev`
- **Build**: Build the production bundle using `npm run build`
- **Lint/Type Check**: Determine from package.json scripts (typically `npm run lint` or `npm run type-check`)