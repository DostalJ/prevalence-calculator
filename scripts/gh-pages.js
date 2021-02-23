const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/DostalJ/prevalence-calculator.git',
        user: {
            name: 'Jakub Dostál',
            email: 'dostal@abradatas.cz'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)