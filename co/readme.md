<code>
co(gen)
</code>

 <code> if (typeof gen === 'function') gen = gen.apply(ctx, args);
 </code>

 # 如果gen是一个函数 继续回调自己本身
 <code> onFulfilled();
   function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
    </code>
  # 执行onFulfilled
  # 由 generator传递给下一个指针 执行next函数
  <code>

   function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  </code>
  #根据ret.done 来判断是否generator 内部也 yeild函数执行完成
  如果没有执行完成 继续回调自己本身
