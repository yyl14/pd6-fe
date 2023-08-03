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
            preset: "lighthouse:recommended",
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