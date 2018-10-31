bootstrap-loader-example
=========================

```bash
### Install deps, this will run the postinstall script installing dev version
yarn install

### Run dev server with hot reloading

# Bootstrap 3
yarn run bs3:dev

# Bootstrap 4
yarn run bs4:dev

### Run production server

# Bootstrap 3
yarn run bs3:prod

# Bootstrap 4
yarn run bs4:prod

# Run no config
yarn run bs:no-config
```

### Notes

`sass-resources-loader` imports specified SASS files into every SASS file it processes. In this particular case, `styleLoaders` are (Bootstrap 3, development):

```yaml
- style-loader
- css-loader
- sass-loader
- postcss-loader
- sass-resources-loader?resources=app/styles/resources.scss
```

So, `app/styles/resources.scss` is implicitly imported into `app/styles/bootstrap/pre-customizations.scss` among other things. There `$custom-border-radius` value is assigned to `$alert-border-radius`. You can see the alert affected at the bottom of the page.
