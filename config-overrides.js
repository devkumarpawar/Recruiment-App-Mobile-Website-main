const { override, addLessLoader, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled :true,
            modifyVars: { '@primary-color': '#1DA57A'},
        }
    })
);