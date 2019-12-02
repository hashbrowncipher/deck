import { KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_UPSERT_CONTROLLER } from './wizard/upsert.controller';
import { KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_PORTS_CONTROLLER } from './wizard/ports.controller';
import { KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_ADVANCEDSETTINGS_CONTROLLER } from './wizard/advancedSettings.controller';
('use strict');

const angular = require('angular');

export const KUBERNETES_V1_LOADBALANCER_CONFIGURE_CONFIGURE_KUBERNETES_MODULE =
  'spinnaker.loadBalancer.configure.kubernetes';
export const name = KUBERNETES_V1_LOADBALANCER_CONFIGURE_CONFIGURE_KUBERNETES_MODULE; // for backwards compatibility
angular.module(KUBERNETES_V1_LOADBALANCER_CONFIGURE_CONFIGURE_KUBERNETES_MODULE, [
  KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_UPSERT_CONTROLLER,
  KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_PORTS_CONTROLLER,
  KUBERNETES_V1_LOADBALANCER_CONFIGURE_WIZARD_ADVANCEDSETTINGS_CONTROLLER,
]);
