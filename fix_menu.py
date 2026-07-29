import re, glob

new_menu = '''<div class="mobile-menu" id="mobileMenu">
    <a href="index.html">🏠 Home</a>
    <a href="settings.html">⚙️ Settings</a>
    <a href="more.html">ℹ️ Info</a>
  </div>'''

pattern = re.compile(r'<div class="mobile-menu" id="mobileMenu">.*?</div>', re.DOTALL)

for f in glob.glob('*.html'):
    with open(f, encoding='utf-8') as file:
        content = file.read()
    if 'mobileMenu' in content:
        new_content = pattern.sub(new_menu, content, count=1)
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print("Updated:", f)
        else:
            print("No change:", f)
    else:
        print("Skipped (no mobileMenu):", f)
