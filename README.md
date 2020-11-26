# UI Preview Web Component

User interface preview web component. It can be used by demonstrating user interfaces without embedding third party providers.

```bash
git clone https://github.com/canburaks/ui-preview.git
```

Get `ui-preview.js` file located in `dist` folder and put your HTML file.

## Usage

```html
<!--Load ui-preview.js file -->
<ui-preview></ui-preview>
```
<br/>

You can provide initial values.

```html
<ui-preview
    ui-html="<p>paragraph</p>"
    ui-css="p {color:red;}"
    ui-js=""
    >
</ui-preview>
```
<br/>

Full demonstration of the web component.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="./dist/ui-preview.js"></script>
  </head>
  <body>
    <div style="padding:5vw;">

        <ui-preview
            ui-html="<p>paragraph</p>"
            ui-css="p {color:red;}"
            ui-js=""
          >
      </ui-preview>

    </div>
  </body>
</html>
```