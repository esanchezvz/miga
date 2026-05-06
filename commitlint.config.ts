/// <reference types="node" />

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { RuleConfigSeverity, type SyncRule, type UserConfig } from '@commitlint/types';
import yaml from 'js-yaml';

type Workspace = {
	packages: string[];
	catalog: Record<string, string>;
};

const isSystemError = (error: unknown): error is NodeJS.ErrnoException => {
	return error instanceof Error && typeof (error as NodeJS.ErrnoException).code === 'string';
};

const getPackageJson = (dirPath: string) => {
	const str = readFileSync(path.join(dirPath, 'package.json')).toString();
	const packageJson: { name: string } = JSON.parse(str);

	return packageJson;
};

const getPackageName = (packagePath: string): string => {
	try {
		const packageJson = getPackageJson(packagePath);

		return packageJson.name;
	} catch (error) {
		// If no package.json is found, use the name of the directory
		if (isSystemError(error) && error.code === 'ENOENT') {
			const parts = packagePath.split('/');
			return parts[parts.length - 1];
		}

		throw error;
	}
};

const getRepoPrefix = () => `${getPackageJson(__dirname).name.split('/')[0]}/`;

const getScopes = (): string[] => {
	const repoPrefix = getRepoPrefix();
	const workspace = <Workspace>yaml.load(readFileSync('./pnpm-workspace.yaml').toString());
	// directories that contain packages, as defined in pnpm-workspace.yaml
	const packagePaths = workspace.packages
		.map((p) => path.join(__dirname, p.replace('/*', '')))
		.filter((p) => existsSync(p) && statSync(p).isDirectory());

	const packages = packagePaths.flatMap((dirPath) =>
		readdirSync(dirPath, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => path.join(dirPath, entry.name)),
	);

	const scopes: string[] = packages.map((p) => {
		const name = getPackageName(p);
		const parts = name.split(repoPrefix);

		return parts[parts.length - 1];
	});

	return scopes;
};

const hasUppercase = (value: string | string[]) => {
	const str = Array.isArray(value) ? value.join('') : value;
	return /[A-Z]/.test(str);
};

const isRegExp = (variable: unknown) => variable instanceof RegExp;

const subjectFormatRule: SyncRule<RegExp | undefined> = ({ subject }, when, idRegex) => {
	if (when === 'never') return [true];
	if (idRegex && !isRegExp(idRegex)) return [false, 'Invalid RegExp instance.'];

	const pattern = idRegex ?? /^[A-Z]+-\d+$/;
	const words = subject?.trim().split(/\s+/) ?? []; // ignores testing any space in between words
	const [firstWord, ...restWords] = words;

	const hasId = pattern.test(firstWord);

	if (hasId) {
		const isValid = !hasUppercase(restWords);
		return [isValid, !isValid ? 'subject must be lowercase after id.' : undefined];
	}

	if (hasUppercase(firstWord)) return [false, `id ${firstWord} doesn't match pattern ${pattern}.`];
	// if (hasUppercase(words)) return [false, 'subject must be lowercase.'];

	return [true];
};

const config: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': [RuleConfigSeverity.Error, 'always', getScopes()],
		'body-empty': [RuleConfigSeverity.Error, 'always'],
		'subject-format': [RuleConfigSeverity.Error, 'always'], // third arg can be a regex (eg.  /^NAME+-\d+$/)
	},
	plugins: [{ rules: { 'subject-format': subjectFormatRule } }],
};

export default config;
