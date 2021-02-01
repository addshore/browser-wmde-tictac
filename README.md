# WMD TicTac

## Development

This extension uses [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)

    $ npm install

### While developing

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

### For builds

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

### Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 
