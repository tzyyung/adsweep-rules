# AdSweep Rules Repository

Community-maintained hook rules and domain blocklist for [AdSweep](https://github.com/tzyyung/AdSweep).

## Structure

```
adsweep-rules/
├── index.json                          # App index + domain list metadata
├── domains/
│   └── adsweep_domains.txt             # 99,000+ ad domains (auto-updated weekly)
├── apps/
│   └── com.realbyteapps.moneymanagerfree/
│       ├── rules.json                  # App-specific hook rules
│       └── metadata.json              # Version, author, status
└── .github/workflows/
    └── update-domains.yml              # Weekly domain list sync
```

## Usage

```bash
# Auto-download rules + latest domain list for your APK
python inject.py --apk target.apk --rules-url auto

# Or specify this repo explicitly
python inject.py --apk target.apk --rules-url https://raw.githubusercontent.com/tzyyung/adsweep-rules/main
```

Manager App 在 PATCH 時也會自動從此 repo 下載 app rules 和最新域名清單。

## Domain Blocklist

`domains/adsweep_domains.txt` contains 99,000+ ad/tracking domains, aggregated from:

- **AdGuard Base Filter** (~60,000 rules)
- **EasyList** (~90,000 rules)
- **EasyPrivacy** (~30,000 rules)
- **Peter Lowe's List** (~3,000 domains)

Domain list is auto-updated weekly via GitHub Actions.

## Available App Rules

| App | Package | Hooks | Status | Version |
|-----|---------|-------|--------|---------|
| Money Manager | com.realbyteapps.moneymanagerfree | 9 | verified | 4.10.8 |

## Contributing

1. Use `--discover` mode to analyze an App
2. Review and verify the discovered rules
3. Submit a PR with:
   - `apps/<package_name>/rules.json`
   - `apps/<package_name>/metadata.json`
   - Update `index.json`

## Rule Format

See [AdSweep RULES.md](https://github.com/tzyyung/AdSweep/blob/main/doc/RULES.md)
