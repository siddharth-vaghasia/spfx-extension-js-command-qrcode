## js-command-document-qrcode

This is SPFx extension which will add a command set to SharePoint list or library to generate QR code for selected item. 

Feel free to reach out on [siddh_me](https://twitter/siddh_me) for any queries/help.

* Please refer this [link](https://www.c-sharpcorner.com/article/generate-document-qr-code-using-spfx-command/) on How to build this from Scratch

![Output](1.png?raw=true "Output")


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
