/* global favoriteCoins */

/*
 * CoinMarketCap API
 * doc: https://coinmarketcap.com/api/
 */

// fields:
// "id": "bitcoin",
// "name": "Bitcoin",
// "symbol": "BTC",
// "rank": "1",
// "price_usd": "13542.8",
// "price_btc": "1.0",
// "24h_volume_usd": "10351500000.0",
// "market_cap_usd": "227190789614",
// "available_supply": "16775762.0",
// "total_supply": "16775762.0",
// "max_supply": "21000000.0",
// "percent_change_1h": "2.75",
// "percent_change_24h": "-1.15",
// "percent_change_7d": "-4.07",
// "last_updated": "1514820858"

const apiEndpoint = 'https://api.coinmarketcap.com/v1/ticker/?limit=1000';

let favoriteCoinsObjects = [];

angular.module('coin', [])
  .controller('coin', ($scope, $http) => {

    $scope.sorter = $scope.sorter = coin => -parseFloat(coin.percent_change_1h);

    $scope.getImageUrl = coinId => `https://files.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;

    $http.get(apiEndpoint).then(data => {
      let coins = data.data;

      coins.forEach(coin => {
        if (favoriteCoins.includes(coin.id)) {
          coin.isFavorite = true;
          favoriteCoinsObjects.push(coin);
        }
      });

      $scope.coins = coins;
      $scope.favoriteCoins = favoriteCoinsObjects;
    });
  });


