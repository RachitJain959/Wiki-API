const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'));

// Do not use localhost
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema);

app
  .route('/articles')

  .get(function (req, res) {
    Article.find({})
      .then(function (foundArticles) {
        res.send(foundArticles);
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle
      .save()
      .then(function (msg) {
        res.send('Success!');
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  .delete(function (req, res) {
    Article.deleteMany()
      .then(function (msg) {
        res.send('Success!');
      })
      .catch(function (err) {
        res.send(err);
      });
  });

app.listen(3001, function () {
  console.log('Server on port 3001');
});
