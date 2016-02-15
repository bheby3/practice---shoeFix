var app = angular.module('app')
    .controller('mainCtrl', function ($scope, productService, $location) {


        $scope.filter = {
            stability: [],
            brand: [],
            offset: [],
            weight: [],
            category: [],
            gender: []
        }

        $scope.customerCart = [];
        $scope.viewProd = {};
        $scope.modal = false;
        $scope.addProductVariable = true;
        $scope.menuVariable = true;
        $scope.adminPage = false;
        $scope.currentUser = undefined;
        //adminId = '56be5c52ffdd55d121cd3c6b';  //DO NOT USE LIVE!!!
        adminId = '56c1580341825fab07c3fbb6'
        $scope.cartTotal = 0;
        $scope.cartItems = undefined;
//////////////////// customer
        $scope.addProductForm = function () {
            $scope.addProductVariable = !$scope.addProductVariable;
        }
        $scope.toggleMenu = function () {
            $scope.menuVariable = !$scope.menuVariable;
        }
        $scope.addProductToCart = function (product) {
            productService.addToCart(product).then(
                function (response) {
                    $scope.cartItems += 1;
                    $scope.cartTotal += Number(response.price);
                    $scope.getCustomerCart();
                }
            )
        }
        $scope.removeProductFromCart = function (product) {
            console.log(product);
            productService.removeFromCart(product).then(
                function (response) {
                    console.log(response);
                    $scope.cartItems = response.cart.length;
                    //var cart = response.cart;
                    //console.log(cart);
                    //$scope.cartItems = cart.length;
                    console.log(response);
                    for (var i = 0; i < response.cart.length; i++) {
                        console.log(response.cart[i]);
                        //var total = Number(response.cart[i].price)
                        //console.log(total);
                        //$scope.cartTotal += total;
                    }
                    console.log($scope.customerCart);
                    $scope.getCustomerCart();
                })

        }
        $scope.getCustomerCart = function () {
            productService.getCustomCart()
                .then(function (response) {
                    console.log(response);
                    var cart = response.cart;
                    while($scope.customerCart.length){
                        $scope.customerCart.pop();
                    }
                    //console.log(cart);
                    $scope.cartItems = cart.length;
                    $scope.cartTotal = 0;
                    for (var i = 0; i < cart.length; i++) {
                        var total = Number(cart[i].price)
                        console.log(total);
                        $scope.cartTotal += total;
                    }
                    $scope.customerCart.push(response)
                })
        }
        $scope.getCurrentUser = function () {
            productService.getUser().then(function (response) {
                if (response === false) {
                    return;
                }
                else {
                    $scope.currentUser = response;
                    $scope.getCustomerCart();
                    if ($scope.currentUser._id === adminId) {
                        $scope.adminPage = true;
                    }
                }

                console.log($scope.currentUser);
            })
        }
        $scope.getCurrentUser();
        $scope.showProductDetails = function (product) {

            $scope.modal = !$scope.modal;
            $scope.viewProd = product;
            console.log("shoes ", product);
        }
        $scope.hideProd = function () {
            $scope.modal = !$scope.modal;
        }

/////////////////  admin
        $scope.addProduct = function (product) {
            //console.log(product);
            productService.addProducts(product)
                .then(function (response) {
                    $scope.products.push(response);
                })
        }
        $scope.removeProduct = function (product) {
            productService.removeProducts(product)
                .then(function () {
                    productService.getProducts().then(function (response) {
                        $scope.products = response;
                    });
                });
        };
        productService.getProducts().then(function (response) {
            $scope.products = response;
        })
///////////////
        /*        $scope.addUser = function (user) {
         productService.addUser(user)
         .then(function (response) {
         $scope.user = response;
         })
         }*/
///////////////////// admin
        $scope.updateStabilityArray = function (type, value) {  ////support type, true or false////
            console.log(type, value);
            if (value) {
                if ($scope.filter.stability.indexOf(type) === -1) {
                    $scope.filter.stability.push(type);
                }
            } else {
                if ($scope.filter.stability.indexOf(type) !== -1) {
                    $scope.filter.stability.splice($scope.filter.stability.indexOf(type), 1);
                }
            }
        }
        $scope.updateBrandArray = function (type, value) {
            console.log(type, value);
            if (value) {
                if ($scope.filter.brand.indexOf(type) === -1) {
                    $scope.filter.brand.push(type);
                }
            } else {
                if ($scope.filter.brand.indexOf(type) !== -1) {
                    $scope.filter.brand.splice($scope.filter.brand.indexOf(type), 1);
                }
            }
        }
        $scope.updateOffsetArray = function (type, value) {
            console.log(type, value);
            if (value) {
                if ($scope.filter.offset.indexOf(type) === -1) {
                    $scope.filter.offset.push(type);
                }
            } else {
                if ($scope.filter.offset.indexOf(type) !== -1) {
                    $scope.filter.offset.splice($scope.filter.offset.indexOf(type), 1);
                }
            }
        }
        $scope.updateWeightArray = function (type, value) {
            console.log(type, value);
            if (value) {
                if ($scope.filter.weight.indexOf(type) === -1) {
                    $scope.filter.weight.push(type);
                }
            } else {
                if ($scope.filter.weight.indexOf(type) !== -1) {
                    $scope.filter.weight.splice($scope.filter.weight.indexOf(type), 1);
                }
            }
        }
        $scope.updateGenderArray = function (type, value) {
            console.log(type, value);
            if (value) {
                if ($scope.filter.gender.indexOf(type) === -1) {
                    $scope.filter.gender.push(type);
                }
            } else {
                if ($scope.filter.gender.indexOf(type) !== -1) {
                    $scope.filter.gender.splice($scope.filter.gender.indexOf(type), 1);
                }
            }
        }
        $scope.updateCategoryArray = function (type, value) {
            console.log(type, value);
            if (value) {
                if ($scope.filter.category.indexOf(type) === -1) {
                    $scope.filter.category.push(type);
                }
            } else {
                if ($scope.filter.category.indexOf(type) !== -1) {
                    $scope.filter.category.splice($scope.filter.category.indexOf(type), 1);
                }
            }
        }
    });

app.filter('multiFilter', function () {
    return function (shoes, filter) {  //ng-repeat - passing in each shoe which we are getting from an array of objects(shoes)
        //we are putting on $scope.products on line 120.  filter is the $scope.filter object with arrays of categories
        var results = [];
        console.log(shoes);
        console.log(filter);

        for (var i = 0; i < shoes.length; i++) {  //array of objects

//  stability && brand && offset && weight && gender
            if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }

//  stability && brand && offset && weight
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && offset && gender
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  stability && brand && offset
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && weight
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) === -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && brand && gender
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && offset && weight
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && offset && gender
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && weight
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) === -1 && filter.brand.indexOf(shoes[i].brand) !== -1
                        && filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset && gender
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1
                        && filter.gender.indexOf(shoes[i].gender) === -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight && gender
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1
                        && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }


//  stability && brand
            else if (filter.stability.length > 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(shoes[i].offset) === -1) {
                    results.push(shoes[i]);
                }
            }
//  stability && offset
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && weight
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) === -1
                        && filter.offset.indexOf(compareMe) === -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability && gender
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && offset
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.offset.indexOf(compareMe) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && weight
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  brand && gender
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.brand.indexOf(shoes[i].brand) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && weight
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.weight.indexOf(compareWeight) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  offset && gender
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.offset.indexOf(compareMe) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  weight && gender
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length > 0) {
                var compareMe = shoes[i].offset;
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) {
                    compareMe = compareMe.toString();
                    //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                    if (filter.weight.indexOf(compareWeight) !== -1 && filter.gender.indexOf(shoes[i].gender) !== -1) {
                        results.push(shoes[i]);
                    }
                }
            }
//  stability
            else if (filter.stability.length > 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                if (filter.stability.indexOf(shoes[i].stability) !== -1) { //push all the shoes with the same 
                    // shoe.stability type as those in the filter.stability array to the results array and ng-repeat of just those shoes
                    results.push(shoes[i]);
                }
            }
//  brand
            else if (filter.stability.length === 0 && filter.brand.length > 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                if (filter.brand.indexOf(shoes[i].brand) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  offset
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length > 0
                && filter.weight.length === 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;  //this is a number
                if (compareMe !== null && compareMe !== undefined) { //if the number is not null or undefined.
                    compareMe = compareMe.toString(); //turn it into a string
                }
                //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                if (filter.offset.indexOf(compareMe) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  weight
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length > 0 && filter.gender.length === 0) {
                var compareMe = shoes[i].offset;  //this is a number
                var compareWeight = shoes[i].weight;
                if (compareWeight !== null && compareWeight !== undefined) { //if the number is not null or undefined.
                    compareWeight = compareWeight.toString(); //turn it into a string
                }
                if (compareMe !== null && compareMe !== undefined) { //if the number is not null or undefined.
                    compareMe = compareMe.toString(); //turn it into a string
                }
                //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
                if (filter.weight.indexOf(compareWeight) !== -1) {
                    results.push(shoes[i]);
                }
            }
//  gender
            else if (filter.stability.length === 0 && filter.brand.length === 0 && filter.offset.length === 0
                && filter.weight.length === 0 && filter.gender.length > 0) {
                if (filter.gender.indexOf(shoes[i].gender) !== -1)  {
                    console.log(filter.gender.indexOf(shoes[i].gender));
                    results.push(shoes[i]);
                }
            }
//  all shoes
            else (results.push(shoes[i]));

        }
        console.log(results);

        return results;

    }
});
///////////////////

/*app.filter('multiFilter', function () {
 return function (shoes, filter) {
 var results = [];

 console.log(filter);

 for (var i = 0; i < shoes.length; i++) {

 if (filter.offset.length > 0) {
 var compareMe = shoes[i].offset;
 if(compareMe !== null && compareMe !== undefined) {
 compareMe = compareMe.toString();
 }

 //console.log('comparing: '+compareMe+' | '+filter.offset+' : '+filter.offset.indexOf(compareMe));
 if(filter.offset.indexOf(compareMe) !== -1) {
 results.push(shoes[i]);
 }
 }
 if (filter.stability.length > 0 && filter.brand.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.brand.length === 0 && filter.stability.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.stability.length === 0) {
 if (filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 if (filter.offset.length > 0 ) {
 if (filter.offset.indexOf(shoes[i].offset !== -1))
 results.push(shoes[i]);
 }
 }
 console.log(results);

 return results;

 }
 });*/
/*app.filter('multiFilter', function () {
 return function (shoes, filter) {
 var results = [];

 console.log(filter);

 for (var i = 0; i < shoes.length; i++) {


 if (filter.stability.length > 0 && filter.brand.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1 && filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.brand.length === 0 && filter.stability.length > 0) {
 if (filter.stability.indexOf(shoes[i].stability) !== -1) {
 results.push(shoes[i]);
 }
 }
 else if (filter.stability.length === 0) {
 if (filter.brand.indexOf(shoes[i].brand) !== -1) {
 results.push(shoes[i]);
 }
 }
 //if (filter.offset.length > 0 ) {
 //    if (filter.offset.indexOf(shoes[i].offset !== -1))
 //    results.push(shoes[i]);
 //}

 }
 console.log(results);

 return results;

 }
 });*/


