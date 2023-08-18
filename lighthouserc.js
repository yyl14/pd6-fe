module.exports = {
    ci: {
        collect: {
            // startServerCommand: "yarn start",
            // url: ["http://localhost:3000/"],
            "staticDistDir": "./build",
            settings: {
                onlyCategories: [
                    'performance',
                    'accessibility',
                    'best-practices',
                    'seo',
                  ],
                chromeFlags: "--no-sandbox",
            },
            numberOfRuns: 3
        },
        assert: {
            // assert options here
            // preset: "lighthouse:recommended", // will not pass in CI pipeline
            assertions: {
                // 'categories:performance': [ // will not pass in CI pipeline
                //   'error',
                //   { minScore: 0.9, aggregationMethod: 'median-run' },
                // ],
                // 'categories:accessibility': [ // will not pass in CI pipeline
                //   'error',
                //   { minScore: 1, aggregationMethod: 'pessimistic' },
                // ],
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
            target: 'temporary-public-storage',
        },
        server: {
            // server options here
        },
        wizard: {
            // wizard options here
        },
    },
}