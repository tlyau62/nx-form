# nx-form

## Description
Provide form creation using component and schema method. It provides valdation (veelidate) and i18n (vue i18n).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Terms
- Form
  - handle form submission
- Field set
  - a set of fields
- Field
  - include both group and input
  - for schema field generation
- Group
  - bootstrap group element
  - provide label and validation
  - provide no form element
- Element
  - e.g. Input, Datepicker, Radio
  - bootstrap form element, e.g. b-form-input
  - provide no validation

## TODOS before release
- add i18n
- test on title, placeholders, descriptions, ...
- add example on customizing group