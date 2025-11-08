const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { terser } = require('rollup-plugin-terser')

const packageJson = require('./package.json')

module.exports = [
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
				exports: 'named',
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
				exports: 'named',
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					declaration: false,
				},
			}),
			terser(),
		],
		external: ['react', 'react-dom', '@material-ui/core', '@material-ui/icons'],
	},
]

