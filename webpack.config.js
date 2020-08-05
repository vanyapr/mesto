const path = require('path'); //Получаем абсолютный путь, он нужен для указания абсолютного пути до файла вывода
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Плагин для работы с хтмл в вебпаке
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Плагин для склейки цсс

module.exports = {
  entry: { main: './src/scripts/script.js' }, //Исходный файл
  output: {
    path: path.resolve(__dirname, 'dist'), //Директория назначения
    filename: 'main.js' //Имя файла в директории
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Регулярное выражение для поиска яваскриптов
        loader: 'babel-loader', //Обработчик яваскриптов
        options: { //Пришлось добавить эту часть в сборщик, потому что иначе сыпало ошибками о неподдерживаемом синтаксисе
          presets: [
            {
              'plugins': ['@babel/plugin-proposal-class-properties'] //включает поддержку продвинутого синтаксиса яваскрипта
            }]
        },
        exclude: path.resolve(__dirname, 'node_modules') //Исключенные директории
      },
      {
        test: /\.(png|svg|jpg|gif)$/,// регулярное выражение, которое ищет все файлы с такими расширениями
        loader: 'file-loader' // при обработке этих файлов нужно использовать file-loader
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,// регулярное выражение, которое ищет все файлы с такими расширениями
        loader: 'html-loader',// при обработке этих файлов нужно использовать file-loader
      },
      {
        test: /\.css$/,// применять это правило только к CSS-файлам
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        loader:  [
          MiniCssExtractPlugin.loader,
          {
          loader: 'css-loader',
          options: { importLoaders: 1 } //Настройка для импорта файлов
          },
          'postcss-loader' //Лоадер для минификации файлов
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'test string', //Кастомный тайтл у хтмл файла
      template: './src/index.html' // путь к файлу index.html
    }),

    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
}
