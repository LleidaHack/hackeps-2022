# Hackeps2019

## Frequently Asked Question (FAQs)

The web app will fetch the FAQs from Firestore's `faqs` collection and render them dinamically. This will allow us modify FAQs (Living [here](scripts/assets/faqs.json)) without making any changes to the web client.

To modify existing FAQs add your contributions [here](scripts/assets/faqs.json) and then run the `reset_faqs.py` script. We execute the `reset_faqs` script as follows:

> We recommend a python 3 virtual environment to the scripts. Learn how to create a new virtual env [here](https://docs.python.org/3/library/venv.html). 

```
$ cd scripts
$ pip install -r requirements.txt
$ python reset_faqs.py
```

If the script succeed you won't see any output. 

## Angular stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
