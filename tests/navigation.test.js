const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('local HTML links and fragments resolve', () => {
    for (const page of ['index.html', 'machine-learning.html', 'deep-learning.html', 'ai-models.html']) {
        const html = fs.readFileSync(path.join(root, page), 'utf8');
        for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
            const href = match[1];
            if (href === '#' || /^[a-z]+:/i.test(href) || href.startsWith('//')) continue;
            const [file, fragment] = href.split('#');
            const target = path.join(root, file || page);
            assert.ok(fs.existsSync(target), page + ' -> ' + href);
            if (fragment) {
                const contents = fs.readFileSync(target, 'utf8');
                assert.ok([...contents.matchAll(/id=["']([^"']+)["']/g)].some(m => m[1] === fragment), page + ' -> ' + href);
            }
        }
    }
});

test('navigation handler preserves page links and intercepts valid local fragments', () => {
    const code = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
    const section = code.slice(code.indexOf('// Add click events to navigation links'), code.indexOf('// Navbar background change'));
    assert.ok(section.length > 0);
    let handler, scrolled = null;
    const link = { href: '', getAttribute() { return this.href; }, addEventListener(_, callback) { handler = callback; } };
    vm.runInNewContext(section, { document: { querySelectorAll: () => [link], getElementById: id => id === 'chatbot' ? {} : null }, scrollToSection: id => { scrolled = id; } });
    for (const href of ['machine-learning.html', 'index.html#chatbot', '#missing', '#']) {
        let prevented = false;
        link.href = href;
        handler({ preventDefault() { prevented = true; } });
        assert.equal(prevented, false, href);
    }
    let prevented = false;
    link.href = '#chatbot';
    handler({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(scrolled, 'chatbot');
});
