import fs from 'fs';
import { withSentryConfig } from '@sentry/nextjs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const pathDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Some pages that leverages the next/image component, passed a src value that uses a hostname in the URL
		// that isn't defined in the images.remotePatterns in next.config.js.
		// For more information please see https://nextjs.org/docs/messages/next-image-unconfigured-host
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'aeqqktywno.cloudimg.io',
				port: '',
				pathname: '/v7/**',
			},
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
			},
		],
	},
	sassOptions: {
		includePaths: [path.join(pathDir, '../../node_modules')],
	},
	experimental: {
		// @TODO: Workaround to prevent error `Dynamic Code Evaluation not allowed in Edge Runtime`
		// @see https://jira.almacareer.tech/browse/DS-984
		optimizePackageImports: ['@lmc-eu/spirit-web-react'],
		instrumentationHook: true,
	},
};

const designTokenBrands = fs.readdirSync(path.join(pathDir, '../../libs/design-tokens'));

if (designTokenBrands.includes(process.env.JOBPORTAL_BRAND)) {
	nextConfig.sassOptions.includePaths.push(
		path.join(pathDir, '../../libs/design-tokens', process.env.JOBPORTAL_BRAND, 'scss'),
	);
} else {
	nextConfig.sassOptions.includePaths.push(
		path.join(pathDir, '../../node_modules/@lmc-eu/spirit-design-tokens/scss'),
	);
}

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	org: 'lmc',
	project: 'cyborg',
	silent: false,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	widenClientFileUpload: true,
	reactComponentAnnotation: {
		enabled: true,
	},
	tunnelRoute: '/api/monitoring',
	hideSourceMaps: true,
	disableLogger: true,
	automaticVercelMonitors: false,
});
