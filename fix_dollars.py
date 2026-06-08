import re, sys

with open('src/data/cards.json', 'r', encoding='utf-8') as f:
    data = f.read()

# Fix broken dollar values
data = data.replace(',000,000 (10 days', '$1,000,000 (10 days')
data = data.replace(',000,000 (21 days', '$5,000,000 (21 days')
data = data.replace(',000 per person (,000 per account)', '$1,000 per person ($1,000 per account)')
data = data.replace(',000 per person (,000 per trip)', '$1,000 per person ($1,000 per trip)')
data = data.replace(',500 per person (,000 per trip)', '$2,500 per person ($10,000 per trip)')
data = data.replace(',000 per person (,000 per trip)', '$5,000 per person ($25,000 per trip)')
data = data.replace('/day (up to 3 days)', '$150/day (up to 3 days)')
data = data.replace('31 days (vehicles up to ,000)', '31 days (vehicles up to $65,000)')
data = data.replace('vehicles up to \$65,000)', 'vehicles up to $65,000)')
data = data.replace('(vehicles \$65,000)', '(vehicles $65,000)')

# Fix any remaining corrupted ,000 patterns
data = re.sub(r'(?<!\$)(\d),000', lambda m: f'${m.group(1)},000', data)

with open('src/data/cards.json', 'w', encoding='utf-8') as f:
    f.write(data)

# Verify
for m in re.finditer(r'"valueLabel": "([^"]+)"', data):
    val = m.group(1)
    try:
        print(val)
    except:
        print(val.encode('utf-8', errors='replace').decode('utf-8'))
