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

// refresh every 5 minutes (data refreshes every 5 minutes)
const interval = 1000 * 60 * 5;

const controller = ($scope, $http) => {
  const processData = data => {
    let coins = data.data;
    let favoriteCoinsObjects = [];

    coins.forEach(coin => {
      if (favoriteCoins.includes(coin.id)) {
        coin.isFavorite = true;
        favoriteCoinsObjects.push(coin);
      }
    });

    $scope.coins = coins;
    $scope.favoriteCoins = favoriteCoinsObjects;
  };

  const getData = () => {
    $http.get(apiEndpoint).then(processData);
  }

  $scope.sorter = coin => -parseFloat(coin.percent_change_1h);
  $scope.getImageUrl = coinId => `https://files.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;
  $scope.getCoinmarketcapUrl = coinId => `https://coinmarketcap.com/currencies/${coinId}/`;

  getData();
  setInterval(getData, interval);
};

const templateUrl = 'coins.partial.html';

angular.module('coin', [])
  .component('coins', {
    controller,
    templateUrl,
  });
