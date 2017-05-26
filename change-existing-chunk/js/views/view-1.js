/**
 * Created by steve.gibbings on 26/05/2017.
 */
import PubSub from 'pubsub-js';

export default (() => {
  return {
    init: () => {
      PubSub.publish('view one initialised');
    }
  }
})();