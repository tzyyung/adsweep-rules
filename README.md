# AdSweep Rules Repository

Community-maintained hook rules for [AdSweep](https://github.com/tzyyung/AdSweep).

## Usage

```bash
# Auto-download rules for your APK
python inject.py --apk target.apk --rules-url auto

# Or specify this repo explicitly
python inject.py --apk target.apk --rules-url https://raw.githubusercontent.com/tzyyung/adsweep-rules/main
```

## Available Rules

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
