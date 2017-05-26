/**
 * Created by steve.gibbings on 26/05/2017.
 */

export default () => {
  const view = 'one of many';

  System.import(`./views/${view}`)
    .then((module) => {
      module.deafult.init();
    });
};
