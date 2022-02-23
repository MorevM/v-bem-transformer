import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

import { transformer } from '../lib/transformer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(resolve(__dirname, './fixtures/input.vue'), { encoding: 'utf-8' });
const output = fs.readFileSync(resolve(__dirname, './fixtures/output.vue'), { encoding: 'utf-8' });

describe('realization', () => {
	it('works', () => {
		expect(transformer(input, 'v-bem')).toStrictEqual(output);
	});
});
