import { ConfigContext, ExpoConfig } from 'expo/config';

// GitHub Pages serves the site from /GoLingGo/, so exports for it need a
// base URL. Other hosts (EAS, Netlify, local dev) serve from the root and
// must not get the prefix — the workflow sets GITHUB_PAGES=1.
export default ({ config }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    experiments: {
      ...config.experiments,
      baseUrl: process.env.GITHUB_PAGES ? '/GoLingGo' : undefined,
    },
  }) as ExpoConfig;
