module.exports = {
    ci: {
        collect: {
            startServerCommand: "yarn start",
            url: ["http://localhost:3000/"],
            settings: {
                onlyCategories: [
                    'performance',
                    'accessibility',
                    'best-practices',
                    'seo',
                  ],
                chromeFlags: "--no-sandbox",
            },
            numberOfRuns: 5
        },
        assert: {
            // assert options here
            // preset: "lighthouse:recommended", // will fail in CI pipeline
            assertions: {
                'categories:performance': [
                  'error',
                  { minScore: 0.9, aggregationMethod: 'median-run' },
                ],
                'categories:accessibility': [
                  'error',
                  { minScore: 1, aggregationMethod: 'pessimistic' },
                ],
                'categories:best-practices': [
                  'error',
                  { minScore: 1, aggregationMethod: 'pessimistic' },
                ],
                'categories:seo': [
                  'error',
                  { minScore: 1, aggregationMethod: 'pessimistic' },
                ],
              },
        },
        upload: {
            // upload options here
            target: "temporary-public-storage",
        },
        server: {
            // server options here
        },
        wizard: {
            // wizard options here
        },
    },
}