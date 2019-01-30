// JSON file import
var products = "https://7statum.github.io/test/products.json";
var request = new XMLHttpRequest();
request.open('GET', products);
request.responseType = 'json';
request.send();
request.onload = function () {
    var product = request.response;
    productList(product);
}

var pa = document.getElementsByClassName('product__area');
var clone = document.getElementById('products_section');
var stepper = document.getElementsByClassName('stepper');
var stringMode = '_220x220_1'

function productList(json) {

    for (var i = 0; i < json.length; i++) {
        clone.getElementsByClassName('product_code')[0].innerHTML = "Код: " + json[i].code
        clone.getElementsByClassName('btn btn_cart')[0].setAttribute("data-product-id", json[i].productId)
        clone.getElementsByClassName('url--link product__link')[0].childNodes[1].setAttribute("src", json[i].primaryImageUrl.split(".")[0] + '.' + json[i].primaryImageUrl.split(".")[1] + stringMode + '.' + json[i].primaryImageUrl.split(".")[2])
        clone.getElementsByClassName('product_description')[0].childNodes[1].innerHTML = json[i].title
        clone.getElementsByClassName('goldPrice')[0].innerHTML = json[i].priceGold
        clone.getElementsByClassName('retailPrice')[0].innerHTML = json[i].priceRetail

        stepper[i].addEventListener('click', function(e) {
            if(e.target.className == "stepper-arrow up"){
                this.childNodes[1].setAttribute("value", +this.childNodes[1].getAttribute('value')+ +1)
                console.log(this.parentElement.parentElement.parentElement.getElementsByClassName('goldPrice')[0].innerHTML = this.parentElement.parentElement.parentElement.getElementsByClassName('goldPrice')[0].innerText * this.childNodes[1].getAttribute('value'))
            }
            if(e.target.className == "stepper-arrow down"){
                this.childNodes[1].setAttribute("value", this.childNodes[1].getAttribute('value')-1)
                console.log(this.parentElement.parentElement.parentElement.getElementsByClassName('goldPrice')[0].innerHTML = this.parentElement.parentElement.parentElement.getElementsByClassName('goldPrice')[0].innerText / (+this.childNodes[1].getAttribute('value') + +1))
            }
        })
        // ADD
        pa[0].appendChild(clone.cloneNode(true));
    }
};
