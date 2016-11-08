
```js

co(gen)
```

```js

 if (typeof gen === 'function') gen = gen.apply(ctx, args);

```
##### 1如果gen是一个函数 继续回调自己本身

```js

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

```
##### 2执行onFulfilled
##### 3由 generator传递给下一个指针 执行next函数
```js

    function next(ret) {
       if (ret.done) return resolve(ret.value);
        var value = toPromise.call(ctx, ret.value);
         if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }


```
##### 4根据ret.done 来判断是否generator 内部也 yeild函数执行完成
##### 5如果没有执行完成 继续回调自己本身









