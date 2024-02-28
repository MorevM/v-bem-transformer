import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { transformer } from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(resolve(__dirname, './fixtures/input.vue'), { encoding: 'utf-8' });
const output = readFileSync(resolve(__dirname, './fixtures/output.vue'), { encoding: 'utf-8' });

describe('realization', () => {
	it('works', () => {
		expect(transformer(input, 'v-bem').code).toStrictEqual(output);
	});
});
