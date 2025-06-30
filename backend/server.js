const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  const { order_id, amount, product } = req.query;

  if (!order_id || !amount || !product) {
    return res.send('<h2>Ошибка: отсутствуют параметры заказа</h2>');
  }

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Оплата</title>
        <style>
          body { font-family: sans-serif; background: #f1f1f1; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); text-align: center; }
          button { margin-top: 20px; padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Оплата товара</h2>
          <p><strong>Товар:</strong> ${product}</p>
          <p><strong>Сумма:</strong> ${amount} ₸</p>
          <form action="/pay" method="POST">
            <input type="hidden" name="order_id" value="${order_id}">
            <input type="hidden" name="amount" value="${amount}">
            <input type="hidden" name="product" value="${product}">
            <button type="submit">Оплатить</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/pay', (req, res) => {
  const { order_id, amount, product } = req.body;

  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.send('<h2>✅ Спасибо за оплату! Заказ успешно принят.</h2><a href="/">Вернуться</a>');
});

app.get('/fail', (req, res) => {
  res.send('<h2>❌ Оплата не прошла. Попробуйте снова.</h2><a href="/">Назад</a>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
