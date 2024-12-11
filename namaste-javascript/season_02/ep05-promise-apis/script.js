const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("p1 Rejectd"), 3000);
  setTimeout(() => resolve("p1 Resolved"), 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("p2 Rejectd"), 1000);
  setTimeout(() => resolve("p2 Resolved"), 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("p3 Rejectd"), 2000);
  setTimeout(() => resolve("p3 Resolved"), 2000);
});

// All promises APIs return the Promise. They are used to handle multiple promises in parallel

/**
 * This is FAIL FAST API. It will throw error as soon as
 * any promise is rejected. Otherwise wait for all promises to be fulfilled.
 * It will throw same error of rejected promise
 */
Promise.all([p1, p2, p3])
  .then((data) => console.log("Promise.all: ", data))
  .catch((err) => console.error("Promise.all: ", err));

/**
 * This is SAFEST API. It will never throw error (even if all promises are rejected).
 * It just returns the array of objects with `status` and `value` or `reason`.
 * It waits for all promises to be settled (resolved or rejected)
 */
Promise.allSettled([p1, p2, p3])
  .then((data) => console.log("Promise.allSettled: ", data))
  .catch((err) => console.error("Promise.allSettled: ", err));

/**
 * This API returns the result of first settled promise. It will throw same error if
 * it is rejected or return the result if it is resolved
 */
Promise.race([p1, p2, p3])
  .then((data) => console.log("Promise.race: ", data))
  .catch((err) => console.error("Promise.race: ", err));

/**
 * This is SUCCESS SEEKING API. It returns the result of first resolved promise.
 * In case if all promises are rejected, it will throw the below error:
 * ```
 * AggregateError: All promises were rejected
 * ```
 * and returns array of rejected results in err.errors` property
 */
Promise.any([p1, p2, p3])
  .then((data) => console.log("Promise.any: ", data))
  .catch((err) => {
    console.error("Promise.any: ", err);
    console.log(err.errors);
  });
