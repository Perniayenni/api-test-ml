const { response } = require("express");
const axios = require("axios");

const searchItems = async (req, res = response) => {
  let results = {};
  let items = [];
  let categories = {};
  try {
    results = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );

    categories = results.data.filters
      .find((filter) => filter.id == "category")
      .values.map((value) => value.name);

    for (let i = 0; i <= 3; i++) {
      let result = results.data.results[i];
      items.push({
        id: result.id,
        title: result.title,
        price: result.prices.prices.map((price) => {
          return {
            currency: price.currency_id,
            amount: price.amount,
            decimals: price.decimals ? price.decimals : 0,
          };
        })[0],
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
      });
    }
  } catch (error) {
    return error;
  }

  res.json({
    author: {
      name: "Yennifer",
      lastname: "Pernía",
    },
    categories: categories,
    items: items,
  });
};

const item = async (req, res = response) => {
  let item = {};
  let description = "";
  try {
    const resultItem = await axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const resultDescription = await axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );

    item = resultItem.data;
    description = resultDescription.data;
  } catch (error) {
    return error;
  }

  res.json({
    author: {
      name: "Yennifer",
      lastname: "Pernía",
    },
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
      },
      picture: item.pictures[0].url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text,
    },
  });
};

module.exports = {
  searchItems,
  item,
};
