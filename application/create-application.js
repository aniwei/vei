import application from './application';

export default function (element, callback) {
  const app   = application();

  app.render(element);
  app.registe();

  console.log(app.__json__);

  app.on('load', (app) => {
    if (typeof callback === 'function') {
      callback(app);
    }
  });
}