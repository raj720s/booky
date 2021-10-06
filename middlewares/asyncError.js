export default (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

// export default function catchasync(req, res, nxt) {
//     Promise.resolve(req, res, nxt).catch(nxt);
// }

// const asyncCatch = (func) => (req, res, nxt) => {
//   Promise.resolve(req, res, nxt).catch(nxt);
// };

// export default asyncCatch;
