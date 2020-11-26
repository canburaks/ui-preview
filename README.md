# UI Preview Web Component

User interface preview web component. It can be used by demonstrating user interfaces without embedding third party providers.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="./index.js"></script>
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