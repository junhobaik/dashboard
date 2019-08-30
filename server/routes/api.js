/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import Parser from 'rss-parser';

import { feedModel, userModel } from '../models';
import isAuthenticated from './util';

const router = express.Router();
const parser = new Parser();

router.get('/account', isAuthenticated, (req, res, next) => {
  res.json({
    title: 'Account',
    name: req.user.displayName,
    user: req.user
  });
});

const getFeed = async url => {
  return await parser.parseURL(url);
};

router.get('/getfeed', isAuthenticated, (req, res, next) => {
  const { url } = req.query;

  getFeed(url)
    .then(() => {
      // console.log('Success');
      res.sendStatus(200);
    })
    .catch(err => {
      // console.log('Error');
      res.sendStatus(204);
    });
});

router.post('/addfeed', isAuthenticated, (req, res) => {
  const { feedUrl, category } = req.body;

  getFeed(feedUrl).then(feed => {
    const { items, title, pubDate, link } = feed;

    feedModel
      .findOne({ feedUrl })
      .then(feedData => {
        if (!feedData) {
          return (async () => {
            return await feedModel
              .create({ feedUrl, title, items, pubDate, link })
              .then((created, error) => {
                // console.log('새로운 Feed 추가', created);
                return { id: created._id, title };
              });
          })();
        }

        return { id: feedData._id, title };
      })
      .then(data => {
        userModel
          .find({ 'feedList.feedId': data.id })
          .then(userData => {
            if (!userData.length) {
              console.log('새로운 피드 추가');
              const update = async () => {
                const updateRes = await userModel.updateOne(
                  { googleId: req.user.id },
                  {
                    $push: {
                      feedList: {
                        feedId: data.id,
                        title: data.title,
                        category,
                        link
                      }
                    }
                  }
                );
                if (updateRes.n === 1) return 201;
                return 500;
              };

              update().then(code => {
                res.sendStatus(code);
              });
            } else {
              console.log('이미 추가된 피드');
              res.sendStatus(204);
            }
          })
          .catch(err => {
            console.log('catch', err);
            res.sendStatus(500);
          });
      });
  });
});

export default router;
