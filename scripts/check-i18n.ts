#!/usr/bin/env bun
/**
 * i18n completeness check — verifies all keys in en.json exist in all other locale files.
 * Run: bun run test:i18n
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const MESSAGES_DIR = join(import.meta.dir, '..', 'messages');
const BASE_LOCALE = 'en';
const LOCALES = ['es', 'it', 'fr', 'de', 'nl'];

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

function flattenKeys(obj: JsonObject, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value as JsonObject, fullKey);
    }
    return [fullKey];
  });
}

function loadJson(locale: string): JsonObject {
  const path = join(MESSAGES_DIR, `${locale}.json`);
  if (!existsSync(path)) {
    console.error(`❌ Missing file: messages/${locale}.json`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, 'utf-8')) as JsonObject;
}

const baseJson = loadJson(BASE_LOCALE);
const baseKeys = flattenKeys(baseJson);

console.log(`\nVerba i18n completeness check`);
console.log(`Base locale: ${BASE_LOCALE} (${baseKeys.length} keys)\n`);

let allPassed = true;

for (const locale of LOCALES) {
  const targetJson = loadJson(locale);
  const targetKeys = new Set(flattenKeys(targetJson));

  const missing = baseKeys.filter((k) => !targetKeys.has(k));

  if (missing.length === 0) {
    console.log(`✅ ${locale.toUpperCase()} — all ${baseKeys.length} keys present`);
  } else {
    console.log(`❌ ${locale.toUpperCase()} — missing ${missing.length} key(s):`);
    for (const key of missing) {
      console.log(`     · ${key}`);
    }
    allPassed = false;
  }
}

console.log('');

if (allPassed) {
  console.log('All locales complete.\n');
  process.exit(0);
} else {
  console.log('Some locales have missing keys. Fix before deploying.\n');
  process.exit(1);
}
