# watch-site

### Setup
1. `nvm use 14`
1. `ng serve`

### Deployment
> Temp until I do pipeline things; site is published from a different branch.

1. `export GOOGLE_CLOUD_API_KEY="THE_KEY"`
1. `npm run deploy`
1. copy `docs/` out
1. `git reset head -hard`
1. `git checkout gh-pages`
1. paste `docs/*` into root
1. `git add . & git commit -m "deploy" & git push`