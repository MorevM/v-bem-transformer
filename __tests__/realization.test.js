import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';

import { transformer } from '../lib/transformer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(resolve(__dirname, './fixtures/input.vue'), { encoding: 'utf-8' });
const output = fs.readFileSync(resolve(__dirname, './fixtures/output.vue'), { encoding: 'utf-8' });

describe('realization', () => {
	it('works', () => {
		expect(transformer(input, 'v-bem')).toStrictEqual(output);
	});
});
