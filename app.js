const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const _ = require('lodash');
const { Liquid } = require('./model/liquid');

const app = express();
app.use(cors({credentials: false, origin: '*', exposedHeaders: ['Content-Disposition']}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Ini nanti pake databasemu sendiri
const db = 'mongodb://admin:admin@localhost:27017/easy_vs?authSource=admin'

mongoose.connect(db, {})
  .then(() => console.log(`Connected to Database...`));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/liquid', async (req, res) => {
  try {
    const allLiquid = await Liquid.find({});
    return res.status(200).json({ success: true, data: allLiquid })  
  } catch (error) {
    return res.status(503).json({ success: false, message: error })
  }
})

app.post('/liquid', async (req, res) => {
  try {
    const payload = {
      brand: _.get(req, 'body.brand'),
      name: _.get(req, 'body.name'),
      flavor: _.get(req, 'body.flavor'),
      nicotine: _.get(req, 'body.nicotine'),
      type: _.get(req, 'body.type'),
      price: _.get(req, 'body.price'),
    }
    const newLiquid = new Liquid(payload);
    await newLiquid.save()
    return res.status(201).json({ success: true, data: newLiquid })
  } catch (error) {
    return res.status(503).json({ success: false, message: error })
  }
})

app.put('/liquid/:id', async (req, res) => {
  try {
    const id = _.get(req, 'params.id')
    const payload = {
      brand: _.get(req, 'body.brand'),
      name: _.get(req, 'body.name'),
      flavor: _.get(req, 'body.flavor'),
      nicotine: _.get(req, 'body.nicotine'),
      type: _.get(req, 'body.type'),
      price: _.get(req, 'body.price'),
    }

    Liquid.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    )
      .then(updated => {
        if (updated) {
          return res.json({ success: true , data: updated });
        } else {
          return res.status(400).json({ success: false , message: 'ID tidak ditemukan' });
        }
      })
      .catch((error) => {
        return res.status(503).json({ success: false, message: error })
      })
  } catch (error) {
    return res.status(503).json({ success: false, message: error })
  }
})

app.delete('/liquid/:id', async (req, res) => {
  try {
    const id = _.get(req, 'params.id')
    const payload = {
      brand: _.get(req, 'body.brand'),
      name: _.get(req, 'body.name'),
      flavor: _.get(req, 'body.flavor'),
      nicotine: _.get(req, 'body.nicotine'),
      type: _.get(req, 'body.type'),
      price: _.get(req, 'body.price'),
    }

    Liquid.findByIdAndDelete(
      id,
      { $set: payload },
      { new: true }
    )
      .then(updated => {
        if (updated) {
          return res.json({ success: true , data: updated });
        } else {
          return res.status(400).json({ success: false , message: 'ID tidak ditemukan' });
        }
      })
      .catch((error) => {
        return res.status(503).json({ success: false, message: error })
      })
  } catch (error) {
    return res.status(503).json({ success: false, message: error })
  }
})

app.listen(3000, () => console.log('Running at port 3000...'));