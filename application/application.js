import mitt           from 'mitt';

import Component      from './component';
import Renderer       from '../renderer';
import JSXComponent   from '../jsx/jsx-component';
import deserialize    from './deserialize';


export default function createApplication (element) {
  const app = mitt();
  
  const pageEvents = {
    'onLoad':             'load',
    'onReady':            'ready',
    'onShow':             'show',
    'onHide':             'hide',
    'onUnLoad':           'unload',
    'onPullDownRefresh':  'pullDownRefresh',
    'onReachBottom':      'reachBottom',
    'onShareAppMessage':  'shareAppMessage',
    'onPageScroll':       'pageScroll'
  }

  Object.getOwnPropertyNames(pageEvents).forEach((name) => {
    const emitName = pageEvents[name];

    app[name] = function (...args) {
      app.emit.apply(this, [emitName, this, args]);
    }
  });

  app.render = function (element) {
    this.renderer     = new Renderer({ app: app });
    this.__rendered__ = this.renderer.render(element);
    this.__json__     = deserialize(this.__rendered__);
  }

  app.transform = function (element) {
    if (!element) {
      throw new Error(`Render can not return undefined or null`);
    } else {
      if (!element.$$typeof && !element.__component__) {
        throw new Error(`Render returns an illegal element`);
      }

      const getComponents = (element) => {
        const cmpt = element instanceof JSXComponent ? element : element.__component__;

        if (cmpt) {
          const name      = cmpt.constructor.name;
          const component = new Component(name, cmpt.props);
          const children  = element.children || [];
          
          if (children) {
            if (children.length > 0) {
              component.children = children.map(child => {
                const c = getComponents(child);
                
                if (c) {
                  c.parent = component;
                }

                return c;
              }).filter(child => child);
            }
          }

          return component;
        }
      }

      return getComponents(element);
    }
  }

  app.registe = function () {
    this.data = this.__json__;

    Page(this);
  }

  app.on('addEventListener', (meta) => {
    const { viewid, name, handler } = meta;

    app[`${name}.${viewid}`] = (...args) => {
      handler(...arg);
    }
  });

  app.on('removeEventListener', () => {
    const { viewid, name } = meta;

    delete app[`${name}.${viewid}`];
  });

  return app;
}