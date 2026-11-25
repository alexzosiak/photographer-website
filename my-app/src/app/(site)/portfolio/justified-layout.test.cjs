const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, 'justified-layout.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
});
const layoutModule = { exports: {} };
vm.runInNewContext(outputText, { exports: layoutModule.exports });
const { getJustifiedLayout } = layoutModule.exports;
const options = { gap: 16, targetHeight: 300, maxRowItems: 6 };
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.001, `${actual} != ${expected}`);

test('mixed orientations preserve proportions and fill complete rows', () => {
    const ratios = [1.5, 2 / 3, 1, 1.5, 2 / 3, 1.5, 1, 2 / 3];
    const { positions, height } = getJustifiedLayout(ratios, 1152, options);
    assert.equal(positions.length, ratios.length);
    const rows = new Map();
    positions.forEach((position, index) => {
        near(position.width / position.height, ratios[index]);
        assert.ok(position.width > 0 && position.height > 0);
        const row = rows.get(position.top) || [];
        row.push(position);
        rows.set(position.top, row);
    });
    const rowList = [...rows.values()];
    rowList.forEach((row, index) => {
        near(row[0].left, 0);
        row.forEach((photo, i) => {
            near(photo.height, row[0].height);
            if (i > 0) near(photo.left, row[i - 1].left + row[i - 1].width + options.gap);
        });
        const right = row.at(-1).left + row.at(-1).width;
        assert.ok(right <= 1152.001);
        if (index < rowList.length - 1) near(right, 1152);
    });
    near(height, positions.at(-1).top + positions.at(-1).height);
});

test('a short last row is not stretched', () => {
    const { positions } = getJustifiedLayout([2 / 3], 1152, options);
    near(positions[0].height, 300);
    near(positions[0].width, 200);
});

test('resizing regroups photos while preserving source order and aspect ratios', () => {
    const ratios = [1.5, 2 / 3, 1.5, 1, 2 / 3, 1];
    const desktop = getJustifiedLayout(ratios, 1152, options);
    const mobile = getJustifiedLayout(ratios, 350, { gap: 8, targetHeight: 200, maxRowItems: 2 });
    assert.notEqual(desktop.positions[1].top, mobile.positions[1].top);
    mobile.positions.forEach((photo, index) => {
        near(photo.width / photo.height, ratios[index]);
        assert.ok(photo.left + photo.width <= 350.001);
        if (index > 0) assert.ok(photo.top >= mobile.positions[index - 1].top);
    });
});

test('empty and not-yet-measured galleries have zero height', () => {
    assert.equal(getJustifiedLayout([], 1000, options).height, 0);
    assert.equal(getJustifiedLayout([1], 0, options).positions.length, 0);
});

test('invalid dimensions fall back to a usable aspect ratio', () => {
    const { positions } = getJustifiedLayout([0, NaN, Infinity, -1], 1000, options);
    positions.forEach((photo) => near(photo.width / photo.height, 1.5));
});

test('rows remain inside the container across narrow and wide viewports', () => {
    for (const width of [1, 100, 350, 768, 1152, 1920]) {
        for (let length = 1; length <= 60; length += 1) {
            const ratios = Array.from({ length }, (_, index) => [2 / 3, 1.5, 1, 2.4, 0.45][(index + length) % 5]);
            const { positions, height } = getJustifiedLayout(ratios, width, options);
            assert.equal(positions.length, length);
            assert.ok(Number.isFinite(height) && height > 0);
            positions.forEach((photo, index) => {
                near(photo.width / photo.height, ratios[index]);
                assert.ok(photo.left >= 0 && photo.top >= 0);
                assert.ok(photo.left + photo.width <= width + 0.001);
            });
        }
    }
});
