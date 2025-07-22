# Coverage Badges Setup

This project uses automatic coverage badges to display test coverage.

## 📊 How it works

1. **Tests with coverage**: `npm run coverage` generates the coverage report
2. **Badge generation**: `coverage-badges-cli` creates the SVG badge from the JSON report
3. **Display**: The badge is displayed in the README.md

## 🚀 Available commands

```bash
# Generate coverage only
npm run coverage

# Generate coverage AND badges
npm run coverage:badges

# Complete command with messages
npm run update-badges
```

## 🔄 Automation

### GitHub Actions
The `.github/workflows/coverage.yml` workflow automatically updates the badge on push/PR.

## 📁 Generated files

- `coverage/badges.svg` - Coverage badge (committed to Git)
- `coverage/coverage-summary.json` - JSON report (ignored by Git)
- `coverage/index.html` - Complete HTML report (ignored by Git)

## 🎨 Customization

To change the badge style, modify the `.coveragerc` file:

```json
{
  "badgeDir": "./badges",
  "reportDir": "./coverage", 
  "badgeStyle": "flat"  // or "flat-square", "plastic", etc.
}
```

## 🔗 In the README

The badge is displayed with:
```markdown
[![Coverage Status](./coverage/badges.svg)](./coverage/index.html)
```

Clicking on the badge opens the complete coverage report.
