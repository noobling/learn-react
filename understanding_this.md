
``` Javascript
var myObj = {

    specialFunction: function () {

    },

    anotherSpecialFunction: function () {

    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();
```
We need to cache this into variable that otherwise a call to `this.specialFunction()` would give an error

We can use `Function.prototype.bind()` 

``` Javascript
var myObj = {

    specialFunction: function () {

    },

    anotherSpecialFunction: function () {

    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        this.getAsyncData(function () {
            this.specialFunction();
            this.anotherSpecialFunction();
        }.bind(this));
    }
};

myObj.render();
```
Bind simply creates a new function with `this` set to provided value. In my own words it sets the `this` value to provided value in parameter. In our case when calling `.bind(this)` this is myObj.

An example of a simple use case

``` Javascript
var foo = {
    x: 5
}

var bar = function () {
    console.log(this.x)
}

var boundFunc = bar.bind(foo)

boundFunc()
```

Here the `this` context instead of being the default global scope (it is being called in global scope that is why default would be global scope) `this` context is set to `foo`

``` HTML
<html>
    <body>
        <button> Update </button>
    </body>
    <script>
        var logger = {
            x: 0,
            update: function () {
                this.x++;
                console.log(this.x)
            }
        }

        document.querySelector('button').addEventListener('click', function() {
            logger.update()
        })
    </script>
</html>
```

In the above example we cannot simply pass logger.update() because `this` context would be the global one so we use an anonymous function. Instead we could use `bind`

``` Javascript
document.querySelector('button').addEventListener('click', logger.update.bind(logger))