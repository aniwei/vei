import mitt from 'mitt';

const events =  'load ready show hide unload pullDownRefresh reachBottom shareAppMessage pageScroll'.split(' ');

export default function (vnode) {
  const app = mitt();

  events.forEach((evt) => {

    app[`on${evt.replace(/\w/, $1 => $1.toUpperCase())}`] = function (...args) {
      this.__view_this__ = this;

      this.emit(evt, ...args);
    }
  });  

  app.render = function (vnode) {

  }

  app.render(vnode);

  Page(app);

  return app;
}